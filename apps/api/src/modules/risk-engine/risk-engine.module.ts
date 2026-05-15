import { Module } from '@nestjs/common';
import { RiskEngineService } from './risk-engine.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({ imports: [PrismaModule, AuditLogModule], providers: [RiskEngineService], exports: [RiskEngineService] })
export class RiskEngineModule {}
