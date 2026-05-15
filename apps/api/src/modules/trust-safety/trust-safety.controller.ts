import { Controller, Get, Post, Patch, Body, Param, Query, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { TrustSafetyService } from './trust-safety.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('trust-safety')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'TRUST_SAFETY_REVIEWER')
export class TrustSafetyController {
  constructor(private readonly trustSafetyService: TrustSafetyService) {}

  @Get('queue')
  getQueue(@Query('status') status?: string, @Query('priority') priority?: string) { return this.trustSafetyService.getReviewQueue(status, priority); }

  @Get('cases/:id')
  getCase(@Param('id') id: string) { return this.trustSafetyService.getCaseById(id); }

  @Get('abuse-reports')
  getAbuseReports(@Query('status') status?: string) { return this.trustSafetyService.getAbuseReports(status); }

  @Post('cases/:id/warn') @HttpCode(HttpStatus.OK)
  warn(@Req() req: any, @Param('id') caseId: string, @Body() body: any) { return this.trustSafetyService.issueWarning(body.userId, req.user.id, body.reason, caseId, body.notes); }

  @Post('cases/:id/suspend') @Roles('ADMIN') @HttpCode(HttpStatus.OK)
  suspend(@Req() req: any, @Param('id') caseId: string, @Body() body: any) { return this.trustSafetyService.suspendUser(body.userId, req.user.id, body.reason, body.durationDays, caseId); }

  @Post('cases/:id/ban') @Roles('ADMIN') @HttpCode(HttpStatus.OK)
  ban(@Req() req: any, @Param('id') caseId: string, @Body() body: any) { return this.trustSafetyService.banUser(body.userId, req.user.id, body.reason, caseId); }

  @Post('cases/:id/preserve-evidence') @HttpCode(HttpStatus.OK)
  preserve(@Req() req: any, @Param('id') caseId: string, @Body() body: any) { return this.trustSafetyService.preserveEvidence(caseId, req.user.id, body.reason); }

  @Patch('cases/:id/resolve') @HttpCode(HttpStatus.OK)
  resolve(@Req() req: any, @Param('id') caseId: string, @Body() body: any) { return this.trustSafetyService.resolveCase(caseId, req.user.id, body.resolution, body.action); }

  @Post('cases/:id/law-enforcement-hold') @Roles('ADMIN') @HttpCode(HttpStatus.OK)
  legalHold(@Req() req: any, @Param('id') caseId: string, @Body() body: any) { return this.trustSafetyService.applyLawEnforcementHold(caseId, req.user.id, body.requestReference, body.notes); }
}
