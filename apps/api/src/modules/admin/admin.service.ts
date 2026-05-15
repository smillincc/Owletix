import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService, private auditLog: AuditLogService) {}

  async getDashboardStats() {
    const [users, missions, activeSessions] = await Promise.all([
      this.prisma.user.count().catch(() => 0),
      this.prisma.mission.count().catch(() => 0),
      this.prisma.streamSession.count({ where: { status: 'LIVE' } }).catch(() => 0),
    ]);
    return { users, missions, activeSessions };
  }

  async getMissionQueue() {
    return this.prisma.mission.findMany({ where: { status: { in: ['MANUAL_REVIEW', 'PAYMENT_AUTHORIZED'] } }, orderBy: { createdAt: 'asc' }, take: 50 }).catch(() => []);
  }

  async getAuditLog(params?: any) {
    return this.prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }).catch(() => []);
  }

  async suspendUser(userId: string, adminId: string, reason: string) {
    await this.prisma.user.update({ where: { id: userId }, data: { status: 'SUSPENDED' } });
    await this.auditLog.log({ action: 'USER_SUSPENDED', actorId: adminId, resourceType: 'User', resourceId: userId, metadata: { reason } });
    return { message: 'User suspended' };
  }

  async banUser(userId: string, adminId: string, reason: string) {
    await this.prisma.user.update({ where: { id: userId }, data: { status: 'BANNED' } });
    await this.auditLog.log({ action: 'USER_BANNED', actorId: adminId, resourceType: 'User', resourceId: userId, metadata: { reason } });
    return { message: 'User banned' };
  }
}
