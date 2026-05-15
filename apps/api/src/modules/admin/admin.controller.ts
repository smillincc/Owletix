import { Controller, Get, Post, Body, Param, Query, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  getDashboard() { return this.adminService.getDashboardStats(); }

  @Get('missions')
  getMissionQueue() { return this.adminService.getMissionQueue(); }

  @Get('audit-log')
  getAuditLog(@Query() params: any) { return this.adminService.getAuditLog(params); }

  @Post('users/:id/suspend') @HttpCode(HttpStatus.OK)
  suspend(@Req() req: any, @Param('id') id: string, @Body() body: any) { return this.adminService.suspendUser(id, req.user.id, body.reason); }

  @Post('users/:id/ban') @HttpCode(HttpStatus.OK)
  ban(@Req() req: any, @Param('id') id: string, @Body() body: any) { return this.adminService.banUser(id, req.user.id, body.reason); }
}
