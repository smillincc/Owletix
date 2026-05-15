import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  async sendEmail(to: string, subject: string, body: string) {
    this.logger.log(`Email to ${to}: ${subject}`);
  }
  async notifyMissionAssigned(pilotId: string, missionId: string) {
    this.logger.log(`Mission ${missionId} assigned to pilot ${pilotId}`);
  }
  async notifyMissionAccepted(customerId: string, missionId: string) {
    this.logger.log(`Mission ${missionId} accepted, notifying customer ${customerId}`);
  }
  async notifyMissionCompleted(customerId: string, missionId: string) {
    this.logger.log(`Mission ${missionId} completed, notifying customer ${customerId}`);
  }
  async notifyAccountWarning(userId: string, reason: string) {
    this.logger.log(`Warning issued to ${userId}: ${reason}`);
  }
}
