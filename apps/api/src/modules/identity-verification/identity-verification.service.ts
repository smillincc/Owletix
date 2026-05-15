import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class IdentityVerificationService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    });
  }

  async startVerification(userId: string, returnUrl: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    await this.prisma.identityVerification.upsert({
      where: { userId },
      create: { userId, status: 'PENDING' },
      update: { status: 'PENDING' },
    });

    if (!process.env.STRIPE_SECRET_KEY) {
      return { url: null, sessionId: null, status: 'PENDING', message: 'Verification submitted. Manual review in 1-2 business days.' };
    }

    try {
      const session = await this.stripe.identity.verificationSessions.create({
        type: 'document',
        metadata: { userId },
        return_url: returnUrl || (process.env.FRONTEND_URL + '/customer/verify?status=complete'),
      });

      await this.prisma.identityVerification.update({
        where: { userId },
        data: { providerRef: session.id },
      });

      return { url: session.url, sessionId: session.id, status: 'PENDING' };
    } catch (err: any) {
      console.error('Stripe Identity error:', err?.message);
      return { 
        url: null, 
        sessionId: null, 
        status: 'PENDING',
        message: 'Verification submitted. Our team will review within 1-2 business days.' 
      };
    }
  }

  async getStatus(userId: string) {
    const record = await this.prisma.identityVerification.findUnique({
      where: { userId },
    });
    return { status: record?.status || 'NOT_STARTED' };
  }

  async handleWebhook(payload: string, signature: string) {
    const webhookSecret = process.env.STRIPE_IDENTITY_WEBHOOK_SECRET || '';
    if (!webhookSecret) return { received: true };

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
        await this.prisma.identityVerification.upsert({
          where: { userId },
          create: { userId, status: 'VERIFIED' },
          update: { status: 'VERIFIED' },
        });
      }
    }

    if (event.type === 'identity.verification_session.requires_input') {
      const session = event.data.object as Stripe.Identity.VerificationSession;
      const userId = session.metadata?.userId;
      if (userId) {
        await this.prisma.identityVerification.upsert({
          where: { userId },
          create: { userId, status: 'FAILED' },
          update: { status: 'FAILED' },
        });
      }
    }

    return { received: true };
  }
}
