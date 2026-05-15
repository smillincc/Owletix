import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}
  async log(data: { action: string; actorId?: string; resourceType?: string; resourceId?: string; metadata?: any }) {
    return this.prisma.auditLog.create({ data: { ...data, metadata: data.metadata ? JSON.stringify(data.metadata) : null } }).catch(() => null);
  }
}
