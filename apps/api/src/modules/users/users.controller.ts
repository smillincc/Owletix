import { Controller, Get, Patch, Body, Param, Req, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me') me(@Req() req: any) { return req.user; }
  @Get('search') @UseGuards(RolesGuard) @Roles('ADMIN') search(@Query('q') q: string) { return this.usersService.searchUsers(q); }
  @Get(':id') @UseGuards(RolesGuard) @Roles('ADMIN', 'TRUST_SAFETY_REVIEWER') findOne(@Param('id') id: string) { return this.usersService.findById(id); }
}
