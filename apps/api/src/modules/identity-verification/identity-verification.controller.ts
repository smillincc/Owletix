import { Controller, Post, Get, Body, Req, UseGuards, Headers } from '@nestjs/common';
import { IdentityVerificationService } from './identity-verification.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('identity-verification')
export class IdentityVerificationController {
  constructor(private readonly service: IdentityVerificationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('start')
  async start(@Req() req: any, @Body() body: any) {
    const returnUrl = body.returnUrl || process.env.FRONTEND_URL + '/customer/verify?status=complete';
    return this.service.startVerification(req.user.id, returnUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  async status(@Req() req: any) {
    return this.service.getStatus(req.user.id);
  }

  @Post('webhook')
  async webhook(@Headers('stripe-signature') sig: string, @Body() payload: any) {
    return this.service.handleWebhook(JSON.stringify(payload), sig);
  }
}
