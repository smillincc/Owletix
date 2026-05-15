import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MissionsModule } from './modules/missions/missions.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { StreamingModule } from './modules/streaming/streaming.module';
import { PilotModule } from './modules/pilot/pilot.module';
import { PublicZonesModule } from './modules/public-zones/public-zones.module';
import { PropertyAuthorizationModule } from './modules/property-authorization/property-authorization.module';
import { PayoutsModule } from './modules/payouts/payouts.module';
import { AdminModule } from './modules/admin/admin.module';
import { TrustSafetyModule } from './modules/trust-safety/trust-safety.module';
import { AuditLogModule } from './modules/audit-log/audit-log.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { IdentityVerificationModule } from './modules/identity-verification/identity-verification.module';
import { RiskEngineModule } from './modules/risk-engine/risk-engine.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    MissionsModule,
    PaymentsModule,
    StreamingModule,
    PilotModule,
    PublicZonesModule,
    PropertyAuthorizationModule,
    PayoutsModule,
    AdminModule,
    TrustSafetyModule,
    AuditLogModule,
    NotificationsModule,
    IdentityVerificationModule,
    RiskEngineModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
