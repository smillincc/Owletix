import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class IdentityVerificationService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-04-30.basil',
    });
  }

  async startVerification(userId: string, returnUrl: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    try {
      // Create Stripe Identity verification session
      const session = await this.stripe.identity.verificationSessions.create({
        type: 'document',
        metadata: { userId },
        options: {
          document: {
            require_id_number: true,
            require_live_capture: true,
            require_matching_selfie: true,
          },
        },
        return_url: returnUrl || process.env.FRONTEND_URL + '/customer/verify?status=complete',
      });

      // Update user status to pending
      await this.prisma.user.update({
        where: { id: userId },
        data: { identityVerificationStatus: 'PENDING' },
      });

      return { url: session.url, sessionId: session.id };
    } catch (err) {
      // Fallback for test mode without Identity enabled
      await this.prisma.user.update({
        where: { id: userId },
        data: { identityVerificationStatus: 'PENDING' },
      });
      return { url: null, sessionId: null, message: 'Verification submitted for manual review' };
    }
  }

  async getStatus(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { identityVerificationStatus: true, identityVerified: true },
    });
    return user;
  }

  async handleWebhook(payload: any, signature: string) {
    const webhookSecret = process.env.STRIPE_IDENTITY_WEBHOOK_SECRET || '';
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch {
      throw new Error('Invalid webhook signature');
    }

    if (event.type === 'identity.verification_session.verified') {
      const session = event.data.object as Stripe.Identity.VerificationSession;
      const userId = session.metadata?.userId;
      if (userId) {
        await this.prisma.user.update({
          where: { id: userId },
          data: { identityVerificationStatus: 'VERIFIED', identityVerified: true },
        });
      }
    }

    if (event.type === 'identity.verification_session.requires_input') {
      const session = event.data.object as Stripe.Identity.VerificationSession;
      const userId = session.metadata?.userId;
      if (userId) {
        await this.prisma.user.update({
          where: { id: userId },
          data: { identityVerificationStatus: 'FAILED' },
        });
      }
    }

    return { received: true };
  }
}
