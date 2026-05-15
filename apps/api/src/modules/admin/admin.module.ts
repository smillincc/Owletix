import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({ imports: [PrismaModule, AuditLogModule, NotificationsModule], providers: [AdminService], controllers: [AdminController] })
export class AdminModule {}
