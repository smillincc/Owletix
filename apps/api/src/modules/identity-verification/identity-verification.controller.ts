import { Controller, Post, Get, Req, Headers, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { IdentityVerificationService } from './identity-verification.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('identity-verification')
export class IdentityVerificationController {
  constructor(private readonly identityVerificationService: IdentityVerificationService) {}

  @Post('start') @UseGuards(JwtAuthGuard) @HttpCode(HttpStatus.CREATED)
  start(@Req() req: any) { return this.identityVerificationService.createVerificationSession(req.user.id); }

  @Get('status') @UseGuards(JwtAuthGuard)
  getStatus(@Req() req: any) { return this.identityVerificationService.getVerificationStatus(req.user.id); }

  @Post('webhook') @HttpCode(HttpStatus.OK)
  webhook(@Req() req: any, @Headers('stripe-signature') sig: string) { return this.identityVerificationService.handleStripeWebhook(req.rawBody, sig); }
}
