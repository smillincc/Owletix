import { Controller, Post, Get, Body, Param, Req, UseGuards, HttpCode, HttpStatus, Headers } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent') @UseGuards(JwtAuthGuard) @HttpCode(HttpStatus.CREATED)
  createIntent(@Req() req: any, @Body() body: any) { return this.paymentsService.createPaymentIntent(body.missionId, req.user.id); }

  @Get('my') @UseGuards(JwtAuthGuard)
  getMy(@Req() req: any) { return this.paymentsService.findByCustomer(req.user.id); }

  @Post('webhook/stripe') @HttpCode(HttpStatus.OK)
  webhook(@Req() req: any, @Headers('stripe-signature') sig: string) { return this.paymentsService.handleWebhook(req.rawBody, sig); }

  @Post(':id/refund') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN')
  refund(@Req() req: any, @Param('id') id: string, @Body() body: any) { return this.paymentsService.adminRefund(id, req.user.id, body.reason, body.amountCents); }

  @Get() @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN')
  findAll() { return this.paymentsService.findAll(); }
}
