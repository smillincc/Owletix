import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { PublicZonesService } from './public-zones.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('public-zones')
export class PublicZonesController {
  constructor(private readonly publicZonesService: PublicZonesService) {}

  @Get()
  findAll(@Query() query: any) { return this.publicZonesService.list(query); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.publicZonesService.findById(id); }

  @Post() @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN') @HttpCode(HttpStatus.CREATED)
  create(@Req() req: any, @Body() body: any) { return this.publicZonesService.create(body, req.user.id); }

  @Patch(':id') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN')
  update(@Req() req: any, @Param('id') id: string, @Body() body: any) { return this.publicZonesService.update(id, body, req.user.id); }

  @Delete(':id') @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN') @HttpCode(HttpStatus.NO_CONTENT)
  deactivate(@Req() req: any, @Param('id') id: string) { return this.publicZonesService.deactivate(id, req.user.id); }
}
