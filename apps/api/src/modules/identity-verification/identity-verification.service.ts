import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class IdentityVerificationService {
  private readonly logger = new Logger(IdentityVerificationService.name);
  constructor(private prisma: PrismaService, private auditLog: AuditLogService) {}

  async createVerificationSession(userId: string) {
    await this.auditLog.log({ action: 'IDENTITY_VERIFICATION_STARTED', actorId: userId, resourceType: 'User', resourceId: userId });
    // In production: create Stripe Identity session
    return { url: `https://verify.stripe.com/mock/${userId}`, sessionId: `vs_mock_${Date.now()}` };
  }

  async getVerificationStatus(userId: string) {
    const verification = await this.prisma.identityVerification.findFirst({ where: { userId } }).catch(() => null);
    return { status: verification?.status || 'NOT_STARTED', verified: verification?.status === 'VERIFIED' };
  }

  async handleStripeWebhook(rawBody: any, sig: string) {
    this.logger.log('Identity webhook received');
    return { received: true };
  }
}
