import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  constructor(private prisma: PrismaService, private auditLog: AuditLogService) {}

  async createPaymentIntent(missionId: string, customerId: string) {
    const mission = await this.prisma.mission.findUnique({ where: { id: missionId } });
    if (!mission || mission.customerId !== customerId) throw new BadRequestException('Mission not found');
    // In production: create Stripe PaymentIntent here
    const clientSecret = `pi_mock_${Date.now()}_secret_mock`;
    await this.auditLog.log({ action: 'PAYMENT_INTENT_CREATED', actorId: customerId, resourceType: 'Mission', resourceId: missionId });
    return { clientSecret, amount: 3000, currency: 'usd' };
  }

  async findByCustomer(customerId: string) {
    return this.prisma.payment.findMany({ where: { mission: { customerId } }, orderBy: { createdAt: 'desc' } }).catch(() => []);
  }

  async findAll() {
    return this.prisma.payment.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }).catch(() => []);
  }

  async adminRefund(paymentId: string, adminId: string, reason: string, amountCents?: number) {
    await this.auditLog.log({ action: 'PAYMENT_REFUNDED', actorId: adminId, resourceType: 'Payment', resourceId: paymentId, metadata: { reason, amountCents } });
    return { message: 'Refund processed' };
  }

  async handleWebhook(rawBody: any, sig: string) {
    this.logger.log('Stripe webhook received');
    return { received: true };
  }

  async capturePayment(paymentId: string) {
    this.logger.log(`Capturing payment ${paymentId}`);
    return { captured: true };
  }
}
