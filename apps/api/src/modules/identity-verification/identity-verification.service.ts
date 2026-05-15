import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class IdentityVerificationService {
  constructor(private prisma: PrismaService) {}

  async startVerification(userId: string, returnUrl: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error('User not found');

      await this.prisma.identityVerification.upsert({
        where: { userId },
        create: { userId, status: 'PENDING' },
        update: { status: 'PENDING' },
      });

      // Try Stripe if key is available
      if (process.env.STRIPE_SECRET_KEY) {
        try {
          const Stripe = require('stripe');
          const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
          const session = await stripe.identity.verificationSessions.create({
            type: 'document',
            metadata: { userId },
            return_url: returnUrl || (process.env.FRONTEND_URL + '/customer/verify?status=complete'),
          });
          await this.prisma.identityVerification.update({
            where: { userId },
            data: { providerRef: session.id },
          });
          return { url: session.url, sessionId: session.id, status: 'PENDING' };
        } catch (stripeErr: any) {
          console.error('Stripe error:', stripeErr?.message);
        }
      }

      return { 
        url: null, 
        status: 'PENDING',
        message: 'Verification submitted. Our team will review within 1-2 business days.' 
      };
    } catch (err: any) {
      console.error('Identity verification error:', err?.message, err?.stack);
      throw new InternalServerErrorException(err?.message || 'Verification failed');
    }
  }

  async getStatus(userId: string) {
    const record = await this.prisma.identityVerification.findUnique({
      where: { userId },
    });
    return { status: record?.status || 'NOT_STARTED' };
  }

  async handleWebhook(payload: string, signature: string) {
    return { received: true };
  }
}
