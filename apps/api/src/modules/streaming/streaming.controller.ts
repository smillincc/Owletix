import { Controller, Get, Post, Param, Req, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('streaming')
@UseGuards(JwtAuthGuard)
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @Post('sessions/:missionId/init') @UseGuards(RolesGuard) @Roles('PILOT') @HttpCode(HttpStatus.CREATED)
  init(@Req() req: any, @Param('missionId') missionId: string) { return this.streamingService.initializeSession(missionId, req.user.id); }

  @Get('sessions/:sessionId/token/pilot') @UseGuards(RolesGuard) @Roles('PILOT')
  pilotToken(@Req() req: any, @Param('sessionId') sessionId: string) { return this.streamingService.generatePilotToken(sessionId, req.user.id); }

  @Get('sessions/:sessionId/token/customer')
  customerToken(@Req() req: any, @Param('sessionId') sessionId: string) { return this.streamingService.generateCustomerToken(sessionId, req.user.id); }

  @Post('sessions/:sessionId/start') @UseGuards(RolesGuard) @Roles('PILOT')
  start(@Req() req: any, @Param('sessionId') sessionId: string) { return this.streamingService.startStream(sessionId, req.user.id); }

  @Post('sessions/:sessionId/end') @UseGuards(RolesGuard) @Roles('PILOT', 'ADMIN')
  end(@Req() req: any, @Param('sessionId') sessionId: string) { return this.streamingService.endStream(sessionId, req.user.id); }

  @Post('sessions/:sessionId/emergency-stop') @HttpCode(HttpStatus.OK)
  emergencyStop(@Req() req: any, @Param('sessionId') sessionId: string, @Body() body: any) { return this.streamingService.emergencyStop(sessionId, req.user.id, body.reason); }

  @Post('sessions/:sessionId/report') @HttpCode(HttpStatus.OK)
  report(@Req() req: any, @Param('sessionId') sessionId: string, @Body() body: any) { return this.streamingService.reportConcern(sessionId, req.user.id, body.category, body.description); }

  @Get('sessions/:sessionId/recording') @UseGuards(RolesGuard) @Roles('ADMIN', 'TRUST_SAFETY_REVIEWER')
  recording(@Req() req: any, @Param('sessionId') sessionId: string) { return this.streamingService.getSignedPlaybackUrl(sessionId, req.user.id); }

  @Get('active') @UseGuards(RolesGuard) @Roles('ADMIN')
  active() { return this.streamingService.getActiveSessions(); }
}
