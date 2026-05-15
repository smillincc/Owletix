import { Module } from '@nestjs/common';
import { IdentityVerificationService } from './identity-verification.service';
import { IdentityVerificationController } from './identity-verification.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuditLogModule, AuthModule],
  providers: [IdentityVerificationService],
  controllers: [IdentityVerificationController],
  exports: [IdentityVerificationService],
})
export class IdentityVerificationModule {}
