import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PublicZonesService {
  constructor(private prisma: PrismaService) {}

  async list(filters?: any) {
    const where: any = { isActive: true };
    if (filters?.city) where.city = { contains: filters.city, mode: 'insensitive' };
    if (filters?.search) where.name = { contains: filters.search, mode: 'insensitive' };
    return this.prisma.publicZone.findMany({ where, take: filters?.limit || 50 }).catch(() => []);
  }

  async findById(id: string) {
    return this.prisma.publicZone.findUnique({ where: { id } });
  }

  async create(data: any, adminId: string) {
    return this.prisma.publicZone.create({ data: { ...data, isActive: true, createdById: adminId } });
  }

  async update(id: string, data: any, adminId: string) {
    return this.prisma.publicZone.update({ where: { id }, data });
  }

  async deactivate(id: string, adminId: string) {
    return this.prisma.publicZone.update({ where: { id }, data: { isActive: false } });
  }
}
