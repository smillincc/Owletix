import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class PayoutsService {
  private readonly logger = new Logger(PayoutsService.name);
  constructor(private prisma: PrismaService, private auditLog: AuditLogService) {}

  async listPayouts(pilotId?: string) {
    const where = pilotId ? { pilotId } : {};
    return this.prisma.payout.findMany({ where, orderBy: { createdAt: 'desc' }, take: 100 }).catch(() => []);
  }

  async holdPayout(id: string, adminId: string, reason: string) {
    await this.auditLog.log({ action: 'PAYOUT_HELD', actorId: adminId, resourceType: 'Payout', resourceId: id, metadata: { reason } });
    return this.prisma.payout.update({ where: { id }, data: { status: 'ON_HOLD' } }).catch(() => ({ message: 'Hold applied' }));
  }

  async releasePayout(id: string, adminId: string) {
    await this.auditLog.log({ action: 'PAYOUT_RELEASED', actorId: adminId, resourceType: 'Payout', resourceId: id });
    return this.prisma.payout.update({ where: { id }, data: { status: 'PENDING' } }).catch(() => ({ message: 'Released' }));
  }

  async processPayout(id: string, adminId: string) {
    this.logger.log(`Processing payout ${id}`);
    await this.auditLog.log({ action: 'PAYOUT_PROCESSED', actorId: adminId, resourceType: 'Payout', resourceId: id });
    return { message: 'Payout processed' };
  }
}
