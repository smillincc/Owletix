import { Module } from '@nestjs/common';
import { IdentityVerificationService } from './identity-verification.service';
import { IdentityVerificationController } from './identity-verification.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [IdentityVerificationService],
  controllers: [IdentityVerificationController],
  exports: [IdentityVerificationService],
})
export class IdentityVerificationModule {}
