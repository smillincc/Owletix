import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class MfaGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    const mfaRoles = ['PILOT', 'ADMIN', 'TRUST_SAFETY_REVIEWER'];
    if (mfaRoles.includes(user?.role) && !user?.mfaVerified) {
      throw new ForbiddenException('MFA verification required');
    }
    return true;
  }
}
