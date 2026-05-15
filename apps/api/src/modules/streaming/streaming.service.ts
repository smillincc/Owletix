import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class StreamingService {
  private readonly logger = new Logger(StreamingService.name);
  constructor(private prisma: PrismaService, private auditLog: AuditLogService) {}

  async initializeSession(missionId: string, pilotId: string) {
    const mission = await this.prisma.mission.findUnique({ where: { id: missionId } });
    if (!mission) throw new NotFoundException('Mission not found');
    if (mission.pilotId !== pilotId) throw new ForbiddenException();
    const session = await this.prisma.streamSession.create({
      data: { missionId, pilotId, status: 'INITIALIZED', roomName: `owletix-${missionId}` },
    }).catch(() => ({ id: `session-${Date.now()}`, roomName: `owletix-${missionId}` }));
    await this.auditLog.log({ action: 'STREAM_INITIALIZED', actorId: pilotId, resourceType: 'Mission', resourceId: missionId });
    return session;
  }

  async generatePilotToken(sessionId: string, pilotId: string) {
    // In production: use LiveKit SDK to generate token
    return { token: `mock-pilot-token-${sessionId}`, url: process.env.LIVEKIT_URL || 'wss://livekit.example.com' };
  }

  async generateCustomerToken(sessionId: string, customerId: string) {
    return { token: `mock-customer-token-${sessionId}`, url: process.env.LIVEKIT_URL || 'wss://livekit.example.com' };
  }

  async startStream(sessionId: string, pilotId: string) {
    await this.auditLog.log({ action: 'STREAM_STARTED', actorId: pilotId, resourceType: 'StreamSession', resourceId: sessionId });
    return this.prisma.streamSession.update({ where: { id: sessionId }, data: { status: 'LIVE', startedAt: new Date() } }).catch(() => ({ status: 'LIVE' }));
  }

  async endStream(sessionId: string, actorId: string) {
    await this.auditLog.log({ action: 'STREAM_ENDED', actorId, resourceType: 'StreamSession', resourceId: sessionId });
    return this.prisma.streamSession.update({ where: { id: sessionId }, data: { status: 'ENDED', endedAt: new Date() } }).catch(() => ({ status: 'ENDED' }));
  }

  async emergencyStop(sessionId: string, actorId: string, reason: string) {
    this.logger.warn(`Emergency stop: session ${sessionId} by ${actorId}: ${reason}`);
    await this.auditLog.log({ action: 'STREAM_EMERGENCY_STOP', actorId, resourceType: 'StreamSession', resourceId: sessionId, metadata: { reason } });
    return this.prisma.streamSession.update({ where: { id: sessionId }, data: { status: 'ENDED', endedAt: new Date() } }).catch(() => ({ status: 'ENDED' }));
  }

  async reportConcern(sessionId: string, reporterId: string, category: string, description: string) {
    await this.auditLog.log({ action: 'CONCERN_REPORTED', actorId: reporterId, resourceType: 'StreamSession', resourceId: sessionId, metadata: { category, description } });
    return { message: 'Concern reported. Our Trust & Safety team will review.' };
  }

  async getSignedPlaybackUrl(sessionId: string, adminId: string) {
    await this.auditLog.log({ action: 'RECORDING_ACCESSED', actorId: adminId, resourceType: 'StreamSession', resourceId: sessionId });
    return { url: `https://recordings.example.com/${sessionId}?token=mock`, expiresIn: 3600 };
  }

  async getActiveSessions() {
    return this.prisma.streamSession.findMany({ where: { status: 'LIVE' } }).catch(() => []);
  }
}
