import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class PropertyAuthorizationService {
  constructor(private prisma: PrismaService, private auditLog: AuditLogService) {}

  async submitAuthorization(customerId: string, data: any) {
    const auth = await this.prisma.privatePropertyAuthorization.create({
      data: { customerId, ...data, status: 'PENDING_REVIEW' },
    }).catch(() => ({ id: `auth-${Date.now()}`, status: 'PENDING_REVIEW' }));
    await this.auditLog.log({ action: 'PROPERTY_AUTH_SUBMITTED', actorId: customerId, resourceType: 'PropertyAuthorization', resourceId: String((auth as any).id) });
    return auth;
  }

  async findByCustomer(customerId: string) {
    return this.prisma.privatePropertyAuthorization.findMany({ where: { customerId }, orderBy: { createdAt: 'desc' } }).catch(() => []);
  }

  async findById(id: string) {
    return this.prisma.privatePropertyAuthorization.findUnique({ where: { id } }).catch(() => null);
  }

  async getPendingReviews() {
    return this.prisma.privatePropertyAuthorization.findMany({ where: { status: 'PENDING_REVIEW' }, orderBy: { createdAt: 'asc' } }).catch(() => []);
  }

  async adminApprove(id: string, adminId: string, notes?: string) {
    await this.auditLog.log({ action: 'PROPERTY_AUTH_APPROVED', actorId: adminId, resourceType: 'PropertyAuthorization', resourceId: id });
    return this.prisma.privatePropertyAuthorization.update({ where: { id }, data: { status: 'APPROVED' } }).catch(() => ({ message: 'Approved' }));
  }

  async adminReject(id: string, adminId: string, reason: string) {
    await this.auditLog.log({ action: 'PROPERTY_AUTH_REJECTED', actorId: adminId, resourceType: 'PropertyAuthorization', resourceId: id, metadata: { reason } });
    return this.prisma.privatePropertyAuthorization.update({ where: { id }, data: { status: 'REJECTED' } }).catch(() => ({ message: 'Rejected' }));
  }
}
