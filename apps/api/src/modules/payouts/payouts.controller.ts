import { Controller, Get, Post, Param, Req, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { PayoutsService } from './payouts.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('payouts')
@UseGuards(JwtAuthGuard)
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Get('my') @UseGuards(RolesGuard) @Roles('PILOT')
  getMy(@Req() req: any) { return this.payoutsService.listPayouts(req.user.id); }

  @Get() @UseGuards(RolesGuard) @Roles('ADMIN')
  findAll() { return this.payoutsService.listPayouts(); }

  @Post(':id/hold') @UseGuards(RolesGuard) @Roles('ADMIN') @HttpCode(HttpStatus.OK)
  hold(@Req() req: any, @Param('id') id: string, @Body() body: any) { return this.payoutsService.holdPayout(id, req.user.id, body.reason); }

  @Post(':id/release') @UseGuards(RolesGuard) @Roles('ADMIN') @HttpCode(HttpStatus.OK)
  release(@Req() req: any, @Param('id') id: string) { return this.payoutsService.releasePayout(id, req.user.id); }

  @Post(':id/process') @UseGuards(RolesGuard) @Roles('ADMIN') @HttpCode(HttpStatus.OK)
  process(@Req() req: any, @Param('id') id: string) { return this.payoutsService.processPayout(id, req.user.id); }
}
