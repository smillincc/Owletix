import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RiskEngineService {
  constructor(private prisma: PrismaService) {}

  private haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLon/2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  async evaluateRisk(params: { customerId: string; missionType: string; description: string; latitude?: number; longitude?: number }) {
    let riskScore = 0;
    const flags: string[] = [];

    const keywords = await this.prisma.restrictedKeyword.findMany().catch(() => []);
    for (const kw of keywords) {
      if (params.description.toLowerCase().includes(kw.keyword.toLowerCase())) {
        riskScore += kw.weight || 30;
        flags.push(`Restricted keyword: ${kw.keyword}`);
      }
    }

    if (params.latitude && params.longitude) {
      const banned = await this.prisma.bannedLocation.findMany().catch(() => []);
      for (const loc of banned) {
        const dist = this.haversineDistance(params.latitude, params.longitude, loc.latitude, loc.longitude);
        if (dist < loc.radiusMeters) {
          riskScore += 50;
          flags.push(`Near banned location: ${loc.name}`);
        }
      }
    }

    const prior = await this.prisma.mission.findMany({ where: { customerId: params.customerId, status: 'BLOCKED' } }).catch(() => []);
    if (prior.length > 0) riskScore += prior.length * 15;

    const riskLevel = riskScore >= 80 ? 'BLOCKED' : riskScore >= 60 ? 'HIGH' : riskScore >= 30 ? 'MEDIUM' : 'LOW';
    const requiredAction = riskScore >= 80 ? 'BLOCK' : riskScore >= 60 ? 'MANUAL_REVIEW' : 'ALLOW';

    return { riskScore: Math.min(riskScore, 100), riskLevel, requiredAction, flags };
  }
}
