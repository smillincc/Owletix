import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class PilotService {
  constructor(private prisma: PrismaService, private auditLog: AuditLogService, private notifications: NotificationsService) {}

  async createOrUpdateProfile(pilotId: string, data: any) {
    return this.prisma.pilotProfile.upsert({
      where: { userId: pilotId },
      update: data,
      create: { userId: pilotId, ...data, approvalStatus: 'PENDING' },
    }).catch(() => ({ message: 'Profile updated' }));
  }

  async submitForApproval(pilotId: string) {
    await this.auditLog.log({ action: 'PILOT_SUBMITTED_FOR_APPROVAL', actorId: pilotId, resourceType: 'PilotProfile', resourceId: pilotId });
    return this.prisma.pilotProfile.update({ where: { userId: pilotId }, data: { approvalStatus: 'PENDING_REVIEW' } }).catch(() => ({ message: 'Submitted for approval' }));
  }

  async adminApprovePilot(pilotId: string, adminId: string) {
    await this.prisma.pilotProfile.update({ where: { userId: pilotId }, data: { approvalStatus: 'APPROVED' } });
    await this.auditLog.log({ action: 'PILOT_APPROVED', actorId: adminId, resourceType: 'PilotProfile', resourceId: pilotId });
    return { message: 'Pilot approved' };
  }

  async adminRejectPilot(pilotId: string, adminId: string, reason: string) {
    await this.prisma.pilotProfile.update({ where: { userId: pilotId }, data: { approvalStatus: 'REJECTED' } });
    await this.auditLog.log({ action: 'PILOT_REJECTED', actorId: adminId, resourceType: 'PilotProfile', resourceId: pilotId, metadata: { reason } });
    return { message: 'Pilot rejected' };
  }

  async getPendingApprovals() {
    return this.prisma.pilotProfile.findMany({ where: { approvalStatus: 'PENDING_REVIEW' }, include: { user: true } }).catch(() => []);
  }

  async updateAvailability(pilotId: string, isAvailable: boolean) {
    return this.prisma.pilotProfile.update({ where: { userId: pilotId }, data: { isAvailable } }).catch(() => ({ isAvailable }));
  }
}
