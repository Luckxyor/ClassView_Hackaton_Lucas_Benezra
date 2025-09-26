import axios from 'axios';
import { env } from '@config/env';
import type { NotificationMessage } from '@shared-types/domain';

export class CommunicationService {
  constructor (private readonly webhookUrl: string | undefined = env.NOTIFIER_WEBHOOK_URL) {}

  async sendNotification (message: NotificationMessage): Promise<void> {
    if (!this.webhookUrl) {
      // Registro local para debugging si no se configuró servicio externo
      console.info('[CommunicationService] Notificación simulada', message);
      return;
    }

    await axios.post(this.webhookUrl, message);
  }
}
