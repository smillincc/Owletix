import { Controller, Get, Post, Body, Param, Query, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('missions')
@UseGuards(JwtAuthGuard)
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Post() @HttpCode(HttpStatus.CREATED)
  create(@Req() req: any, @Body() dto: any) { return this.missionsService.create(req.user.id, dto); }

  @Get('my')
  getMyMissions(@Req() req: any, @Query() filters: any) { return this.missionsService.findByCustomer(req.user.id, filters); }

  @Get('available') @UseGuards(RolesGuard) @Roles('PILOT')
  getAvailable(@Req() req: any) { return this.missionsService.findAvailableForPilot(req.user.id); }

  @Get() @UseGuards(RolesGuard) @Roles('ADMIN', 'TRUST_SAFETY_REVIEWER')
  findAll(@Query() filters: any) { return this.missionsService.findAll(filters); }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) { return this.missionsService.findOneAuthorized(id, req.user); }

  @Post(':id/questionnaire')
  submitQuestionnaire(@Req() req: any, @Param('id') id: string, @Body() dto: any) { return this.missionsService.submitQuestionnaire(id, req.user.id, dto); }

  @Post(':id/authorize-payment')
  authorizePayment(@Req() req: any, @Param('id') id: string, @Body() body: any) { return this.missionsService.markPaymentAuthorized(id, req.user.id, body.paymentIntentId); }

  @Post(':id/accept') @UseGuards(RolesGuard) @Roles('PILOT')
  accept(@Req() req: any, @Param('id') id: string) { return this.missionsService.pilotAccept(id, req.user.id); }

  @Post(':id/cancel')
  cancel(@Req() req: any, @Param('id') id: string) { return this.missionsService.cancelByCustomer(id, req.user.id); }

  @Post(':id/admin-approve') @UseGuards(RolesGuard) @Roles('ADMIN')
  adminApprove(@Req() req: any, @Param('id') id: string, @Body() body: any) { return this.missionsService.adminApprove(id, req.user.id, body.notes); }

  @Post(':id/admin-reject') @UseGuards(RolesGuard) @Roles('ADMIN')
  adminReject(@Req() req: any, @Param('id') id: string, @Body() body: any) { return this.missionsService.adminReject(id, req.user.id, body.reason); }
}
