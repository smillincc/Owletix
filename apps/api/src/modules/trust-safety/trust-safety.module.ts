import { Module } from '@nestjs/common';
import { TrustSafetyService } from './trust-safety.service';
import { TrustSafetyController } from './trust-safety.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({ imports: [PrismaModule, AuditLogModule, NotificationsModule], providers: [TrustSafetyService], controllers: [TrustSafetyController], exports: [TrustSafetyService] })
export class TrustSafetyModule {}
