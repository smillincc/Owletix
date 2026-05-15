import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findByEmail(email: string) { return this.prisma.user.findUnique({ where: { email } }); }
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async create(data: any) {
    const { password, confirmPassword, ...rest } = data;
    return this.prisma.user.create({ data: { ...rest, role: data.role || 'CUSTOMER', status: 'ACTIVE' } });
  }
  async updateStatus(id: string, status: string) { return this.prisma.user.update({ where: { id }, data: { status } }); }
  async searchUsers(query: string) { return this.prisma.user.findMany({ where: { OR: [{ email: { contains: query } }, { firstName: { contains: query } }] }, take: 20 }); }
}
