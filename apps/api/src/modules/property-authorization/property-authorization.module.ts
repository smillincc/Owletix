import { Module } from '@nestjs/common';
import { PropertyAuthorizationService } from './property-authorization.service';
import { PropertyAuthorizationController } from './property-authorization.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({ imports: [PrismaModule, AuditLogModule, NotificationsModule], providers: [PropertyAuthorizationService], controllers: [PropertyAuthorizationController], exports: [PropertyAuthorizationService] })
export class PropertyAuthorizationModule {}
