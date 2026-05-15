import { Module } from '@nestjs/common';
import { IdentityVerificationService } from './identity-verification.service';
import { IdentityVerificationController } from './identity-verification.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    AuditLogModule,
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [IdentityVerificationService],
  controllers: [IdentityVerificationController],
  exports: [IdentityVerificationService],
})
export class IdentityVerificationModule {}
