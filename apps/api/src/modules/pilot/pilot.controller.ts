import { Controller, Get, Post, Patch, Body, Param, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { PilotService } from './pilot.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('pilot')
@UseGuards(JwtAuthGuard)
export class PilotController {
  constructor(private readonly pilotService: PilotService) {}

  @Patch('me/profile') @UseGuards(RolesGuard) @Roles('PILOT')
  updateProfile(@Req() req: any, @Body() body: any) { return this.pilotService.createOrUpdateProfile(req.user.id, body); }

  @Post('me/submit-for-approval') @UseGuards(RolesGuard) @Roles('PILOT') @HttpCode(HttpStatus.OK)
  submitForApproval(@Req() req: any) { return this.pilotService.submitForApproval(req.user.id); }

  @Patch('me/availability') @UseGuards(RolesGuard) @Roles('PILOT')
  setAvailability(@Req() req: any, @Body() body: any) { return this.pilotService.updateAvailability(req.user.id, body.isAvailable); }

  @Get('pending-approvals') @UseGuards(RolesGuard) @Roles('ADMIN')
  getPending() { return this.pilotService.getPendingApprovals(); }

  @Post(':id/approve') @UseGuards(RolesGuard) @Roles('ADMIN') @HttpCode(HttpStatus.OK)
  approve(@Req() req: any, @Param('id') id: string) { return this.pilotService.adminApprovePilot(id, req.user.id); }

  @Post(':id/reject') @UseGuards(RolesGuard) @Roles('ADMIN') @HttpCode(HttpStatus.OK)
  reject(@Req() req: any, @Param('id') id: string, @Body() body: any) { return this.pilotService.adminRejectPilot(id, req.user.id, body.reason); }
}
