import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({ imports: [PrismaModule, AuditLogModule], providers: [PaymentsService], controllers: [PaymentsController], exports: [PaymentsService] })
export class PaymentsModule {}
