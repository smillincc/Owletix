import { Controller, Get, Post, Body, Param, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { PropertyAuthorizationService } from './property-authorization.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('property-authorizations')
@UseGuards(JwtAuthGuard)
export class PropertyAuthorizationController {
  constructor(private readonly propertyAuthorizationService: PropertyAuthorizationService) {}

  @Post() @HttpCode(HttpStatus.CREATED)
  submit(@Req() req: any, @Body() body: any) { return this.propertyAuthorizationService.submitAuthorization(req.user.id, body); }

  @Get('my')
  getMy(@Req() req: any) { return this.propertyAuthorizationService.findByCustomer(req.user.id); }

  @Get() @UseGuards(RolesGuard) @Roles('ADMIN')
  getPending() { return this.propertyAuthorizationService.getPendingReviews(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.propertyAuthorizationService.findById(id); }

  @Post(':id/approve') @UseGuards(RolesGuard) @Roles('ADMIN') @HttpCode(HttpStatus.OK)
  approve(@Req() req: any, @Param('id') id: string, @Body() body: any) { return this.propertyAuthorizationService.adminApprove(id, req.user.id, body.notes); }

  @Post(':id/reject') @UseGuards(RolesGuard) @Roles('ADMIN') @HttpCode(HttpStatus.OK)
  reject(@Req() req: any, @Param('id') id: string, @Body() body: any) { return this.propertyAuthorizationService.adminReject(id, req.user.id, body.reason); }
}
