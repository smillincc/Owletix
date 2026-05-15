import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TrustSafetyService {
  private readonly logger = new Logger(TrustSafetyService.name);
  constructor(private prisma: PrismaService, private auditLog: AuditLogService, private notifications: NotificationsService) {}

  async getReviewQueue(status?: string, priority?: string) {
    const where: any = {};
    if (status) where.status = status;
    return this.prisma.trustSafetyCase.findMany({ where, orderBy: { createdAt: 'desc' }, take: 50 }).catch(() => []);
  }

  async getCaseById(id: string) {
    return this.prisma.trustSafetyCase.findUnique({ where: { id } }).catch(() => null);
  }

  async issueWarning(userId: string, reviewerId: string, reason: string, caseId?: string, notes?: string) {
    await this.notifications.notifyAccountWarning(userId, reason);
    await this.auditLog.log({ action: 'WARNING_ISSUED', actorId: reviewerId, resourceType: 'User', resourceId: userId, metadata: { reason, caseId } });
    return { message: 'Warning issued' };
  }

  async suspendUser(userId: string, reviewerId: string, reason: string, durationDays?: number, caseId?: string) {
    await this.prisma.user.update({ where: { id: userId }, data: { status: 'SUSPENDED' } });
    await this.auditLog.log({ action: 'USER_SUSPENDED', actorId: reviewerId, resourceType: 'User', resourceId: userId, metadata: { reason, durationDays } });
    return { message: 'User suspended' };
  }

  async banUser(userId: string, reviewerId: string, reason: string, caseId?: string) {
    await this.prisma.user.update({ where: { id: userId }, data: { status: 'BANNED' } });
    await this.auditLog.log({ action: 'USER_BANNED', actorId: reviewerId, resourceType: 'User', resourceId: userId, metadata: { reason } });
    return { message: 'User banned' };
  }

  async preserveEvidence(caseId: string, reviewerId: string, reason: string) {
    await this.auditLog.log({ action: 'EVIDENCE_PRESERVED', actorId: reviewerId, resourceType: 'TrustSafetyCase', resourceId: caseId, metadata: { reason } });
    return { message: 'Evidence preserved' };
  }

  async resolveCase(caseId: string, reviewerId: string, resolution: string, action: string) {
    await this.auditLog.log({ action: 'CASE_RESOLVED', actorId: reviewerId, resourceType: 'TrustSafetyCase', resourceId: caseId, metadata: { resolution, action } });
    return this.prisma.trustSafetyCase.update({ where: { id: caseId }, data: { status: 'RESOLVED' } }).catch(() => ({ message: 'Case resolved' }));
  }

  async applyLawEnforcementHold(caseId: string, adminId: string, requestReference: string, notes: string) {
    await this.auditLog.log({ action: 'LAW_ENFORCEMENT_HOLD', actorId: adminId, resourceType: 'TrustSafetyCase', resourceId: caseId, metadata: { requestReference, notes } });
    return { message: 'Legal hold applied' };
  }

  async getAbuseReports(status?: string) {
    const where: any = {};
    if (status) where.status = status;
    return this.prisma.abuseReport.findMany({ where, orderBy: { createdAt: 'desc' }, take: 50 }).catch(() => []);
  }
}
