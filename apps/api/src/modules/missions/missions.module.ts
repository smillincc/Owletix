import { Module } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { RiskEngineModule } from '../risk-engine/risk-engine.module';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({ imports: [PrismaModule, RiskEngineModule, AuditLogModule, NotificationsModule], providers: [MissionsService], controllers: [MissionsController], exports: [MissionsService] })
export class MissionsModule {}
