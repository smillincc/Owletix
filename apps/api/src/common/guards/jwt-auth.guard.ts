import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err: any, user: any) {
    if (err || !user) throw err || new UnauthorizedException();
    if (user.status === 'BANNED') throw new UnauthorizedException('Account banned');
    if (user.status === 'SUSPENDED') throw new UnauthorizedException('Account suspended');
    return user;
  }
}
