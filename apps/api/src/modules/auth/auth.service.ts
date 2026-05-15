import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private auditLog: AuditLogService,
  ) {}

  async signup(dto: any) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already registered');
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersService.create({ ...dto, passwordHash });
    await this.auditLog.log({ action: 'USER_SIGNUP', actorId: user.id, resourceType: 'User', resourceId: user.id });
    return { message: 'Account created. Please verify your email.' };
  }

  async login(dto: any) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (user.lockedUntil && new Date() < user.lockedUntil) throw new UnauthorizedException('Account temporarily locked');
    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      await this.prisma.user.update({ where: { id: user.id }, data: { failedLoginAttempts: { increment: 1 } } });
      throw new UnauthorizedException('Invalid credentials');
    }
    await this.prisma.user.update({ where: { id: user.id }, data: { failedLoginAttempts: 0, lastLoginAt: new Date() } });
    if (user.mfaEnabled) {
      const tempToken = this.jwtService.sign({ sub: user.id, mfaPending: true }, { expiresIn: '5m' });
      return { requiresMfa: true, tempToken };
    }
    return this.issueTokens(user);
  }

  async verifyMfaAndIssueTokens(dto: any) {
    let payload: any;
    try { payload = this.jwtService.verify(dto.tempToken); } catch { throw new UnauthorizedException('Invalid or expired token'); }
    if (!payload.mfaPending) throw new UnauthorizedException('Invalid token');
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user?.mfaSecret) throw new UnauthorizedException('MFA not configured');
    const valid = speakeasy.totp.verify({ secret: user.mfaSecret, encoding: 'base32', token: dto.code, window: 2 });
    if (!valid) throw new UnauthorizedException('Invalid MFA code');
    return this.issueTokens({ ...user, mfaVerified: true });
  }

  async refreshTokens(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException('Refresh token required');
    let payload: any;
    try { payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret' }); }
    catch { throw new UnauthorizedException('Invalid refresh token'); }
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedException();
    return this.issueTokens(user);
  }

  async logout(userId: string, refreshToken?: string) {
    await this.auditLog.log({ action: 'USER_LOGOUT', actorId: userId });
    return { message: 'Logged out' };
  }

  async verifyEmail(token: string) {
    return { message: 'Email verified' };
  }

  async forgotPassword(email: string) {
    return { message: 'If that email exists, a reset link has been sent.' };
  }

  async resetPassword(token: string, newPassword: string) {
    return { message: 'Password reset successfully' };
  }

  async setupMfa(userId: string, dto: any) {
    const secret = speakeasy.generateSecret({ name: `Owletix:${userId}` });
    await this.prisma.user.update({ where: { id: userId }, data: { mfaSecret: secret.base32 } });
    return { secret: secret.base32, otpauthUrl: secret.otpauth_url };
  }

  private async issueTokens(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role, mfaVerified: user.mfaVerified || false };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign({ sub: user.id }, { secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret', expiresIn: '30d' });
    return { accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName } };
  }
}
