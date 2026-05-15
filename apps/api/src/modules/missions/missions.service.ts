import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RiskEngineService } from '../risk-engine/risk-engine.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MissionsService {
  constructor(
    private prisma: PrismaService,
    private riskEngine: RiskEngineService,
    private auditLog: AuditLogService,
    private notifications: NotificationsService,
  ) {}

  async create(customerId: string, dto: any) {
    if (!dto.agreedToSafetyTerms || !dto.agreedNoPersonTracking || !dto.agreedNoSurveillance) {
      throw new BadRequestException('Must agree to all safety terms');
    }
    const risk = await this.riskEngine.evaluateRisk({ customerId, missionType: dto.type, description: dto.description });
    const status = risk.requiredAction === 'BLOCK' ? 'BLOCKED' : risk.requiredAction === 'MANUAL_REVIEW' ? 'MANUAL_REVIEW' : 'DRAFT';
    const mission = await this.prisma.mission.create({
      data: { customerId, type: dto.type, description: dto.description, status, riskScore: risk.riskScore, riskLevel: risk.riskLevel, publicZoneId: dto.publicZoneId, agreedToSafetyTerms: true, agreedNoPersonTracking: true, agreedNoSurveillance: true },
    });
    await this.auditLog.log({ action: 'MISSION_CREATED', actorId: customerId, resourceType: 'Mission', resourceId: mission.id });
    return mission;
  }

  async findByCustomer(customerId: string, filters?: any) {
    return this.prisma.mission.findMany({ where: { customerId }, orderBy: { createdAt: 'desc' }, take: filters?.limit || 20 });
  }

  async findAll(filters?: any) {
    const where: any = {};
    if (filters?.status) where.status = filters.status;
    return this.prisma.mission.findMany({ where, orderBy: { createdAt: 'desc' }, take: 50 });
  }

  async findOneAuthorized(id: string, user: any) {
    const mission = await this.prisma.mission.findUnique({ where: { id } });
    if (!mission) throw new NotFoundException('Mission not found');
    if (user.role === 'CUSTOMER' && mission.customerId !== user.id) throw new ForbiddenException();
    if (user.role === 'PILOT' && mission.pilotId !== user.id) throw new ForbiddenException();
    return mission;
  }

  async markPaymentAuthorized(id: string, customerId: string, paymentIntentId: string) {
    const mission = await this.prisma.mission.findUnique({ where: { id } });
    if (!mission || mission.customerId !== customerId) throw new ForbiddenException();
    return this.prisma.mission.update({ where: { id }, data: { status: 'PAYMENT_AUTHORIZED' } });
  }

  async pilotAccept(id: string, pilotId: string) {
    const mission = await this.prisma.mission.findUnique({ where: { id } });
    if (!mission) throw new NotFoundException('Mission not found');
    if (!['PAYMENT_AUTHORIZED', 'PILOT_MATCHING'].includes(mission.status)) throw new BadRequestException('Mission not available');
    return this.prisma.mission.update({ where: { id }, data: { pilotId, status: 'ACCEPTED' } });
  }

  async pilotReject(id: string, pilotId: string, reason: string) {
    return this.prisma.mission.update({ where: { id }, data: { status: 'PILOT_MATCHING' } });
  }

  async complete(id: string, actorId: string, actualMinutes: number) {
    const billedMinutes = Math.max(15, Math.ceil(actualMinutes));
    const mission = await this.prisma.mission.update({ where: { id }, data: { status: 'COMPLETED', billedMinutes } });
    await this.auditLog.log({ action: 'MISSION_COMPLETED', actorId, resourceType: 'Mission', resourceId: id, metadata: { billedMinutes } });
    return mission;
  }

  async cancelByCustomer(id: string, customerId: string) {
    const mission = await this.prisma.mission.findUnique({ where: { id } });
    if (!mission || mission.customerId !== customerId) throw new ForbiddenException();
    if (['LIVE', 'COMPLETED'].includes(mission.status)) throw new BadRequestException('Cannot cancel');
    return this.prisma.mission.update({ where: { id }, data: { status: 'CANCELLED' } });
  }

  async findAvailableForPilot(pilotId: string) {
    return this.prisma.mission.findMany({ where: { status: 'PAYMENT_AUTHORIZED' }, orderBy: { createdAt: 'asc' }, take: 20 });
  }

  async adminApprove(id: string, adminId: string, notes?: string) {
    const mission = await this.prisma.mission.update({ where: { id }, data: { status: 'PAYMENT_AUTHORIZED' } });
    await this.auditLog.log({ action: 'MISSION_APPROVED', actorId: adminId, resourceType: 'Mission', resourceId: id });
    return mission;
  }

  async adminReject(id: string, adminId: string, reason: string) {
    const mission = await this.prisma.mission.update({ where: { id }, data: { status: 'REJECTED' } });
    await this.auditLog.log({ action: 'MISSION_REJECTED', actorId: adminId, resourceType: 'Mission', resourceId: id, metadata: { reason } });
    return mission;
  }

  async submitQuestionnaire(id: string, customerId: string, dto: any) {
    return { message: 'Questionnaire submitted', missionId: id };
  }
}
