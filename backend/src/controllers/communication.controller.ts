import type { Request, Response } from 'express';
import { CommunicationService } from '@services/communicationService';
import { z } from 'zod';

const communicationService = new CommunicationService();

const notificationSchema = z.object({
  channel: z.enum(['email', 'whatsapp', 'telegram']).default('email'),
  to: z.string().min(1),
  subject: z.string().optional(),
  templateId: z.string().optional(),
  body: z.string().min(1),
  metadata: z.record(z.any()).optional()
});

export async function postNotification (req: Request, res: Response): Promise<void> {
  const parse = notificationSchema.safeParse(req.body);

  if (!parse.success) {
    res.status(400).json({ message: 'Payload inválido', details: parse.error.flatten().fieldErrors });
    return;
  }

  await communicationService.sendNotification(parse.data);
  res.status(202).json({ status: 'queued' });
}
