import { Module } from '@nestjs/common';
import { PublicZonesService } from './public-zones.service';
import { PublicZonesController } from './public-zones.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({ imports: [PrismaModule, AuditLogModule], providers: [PublicZonesService], controllers: [PublicZonesController], exports: [PublicZonesService] })
export class PublicZonesModule {}
