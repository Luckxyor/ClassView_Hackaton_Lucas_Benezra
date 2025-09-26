import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('4000'),
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID es requerido').optional(),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET es requerido').optional(),
  GOOGLE_REDIRECT_URI: z.string().url('GOOGLE_REDIRECT_URI debe ser una URL válida').optional(),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().email('GOOGLE_SERVICE_ACCOUNT_EMAIL inválido').optional(),
  GOOGLE_SERVICE_ACCOUNT_KEY: z.string().optional(),
  GOOGLE_ADMIN_EMAIL: z.string().email().optional(),
  USE_CLASSROOM_MOCK: z.string().optional(),
  CORS_ORIGIN: z.string().default('*'),
  DATABASE_URL: z.string().url().optional(),
  NOTIFIER_WEBHOOK_URL: z.string().url().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Error al validar variables de entorno', parsed.error.flatten().fieldErrors);
  throw new Error('Variables de entorno inválidas');
}

const env = parsed.data;

export { env };
