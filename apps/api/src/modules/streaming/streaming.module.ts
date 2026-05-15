import { Module } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { StreamingController } from './streaming.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({ imports: [PrismaModule, AuditLogModule], providers: [StreamingService], controllers: [StreamingController], exports: [StreamingService] })
export class StreamingModule {}
