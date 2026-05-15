import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup') @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: any) { return this.authService.signup(dto); }

  @Post('login') @HttpCode(HttpStatus.OK)
  login(@Body() dto: any) { return this.authService.login(dto); }

  @Post('mfa/verify') @HttpCode(HttpStatus.OK)
  verifyMfa(@Body() dto: any) { return this.authService.verifyMfaAndIssueTokens(dto); }

  @Post('refresh') @HttpCode(HttpStatus.OK)
  refresh(@Body() body: any) { return this.authService.refreshTokens(body.refreshToken); }

  @Post('logout') @UseGuards(JwtAuthGuard) @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Req() req: any) { return this.authService.logout(req.user.id, req.body?.refreshToken); }

  @Get('me') @UseGuards(JwtAuthGuard)
  me(@Req() req: any) { return { user: req.user }; }

  @Post('verify-email') @HttpCode(HttpStatus.OK)
  verifyEmail(@Body() body: any) { return this.authService.verifyEmail(body.token); }

  @Post('forgot-password') @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() body: any) { return this.authService.forgotPassword(body.email); }

  @Post('reset-password') @HttpCode(HttpStatus.OK)
  resetPassword(@Body() body: any) { return this.authService.resetPassword(body.token, body.newPassword); }
}
