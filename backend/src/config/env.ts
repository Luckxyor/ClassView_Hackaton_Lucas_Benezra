import 'dotenv/config';
import { z } from 'zod';

const sanitizeOptional = (value: unknown): unknown => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  return value ?? undefined;
};

const envSchema = z.object({
  PORT: z.preprocess(sanitizeOptional, z.string().default('4000')),
  GOOGLE_CLIENT_ID: z.preprocess(sanitizeOptional, z.string().min(1, 'GOOGLE_CLIENT_ID es requerido').optional()),
  GOOGLE_CLIENT_SECRET: z.preprocess(sanitizeOptional, z.string().min(1, 'GOOGLE_CLIENT_SECRET es requerido').optional()),
  GOOGLE_REDIRECT_URI: z.preprocess(sanitizeOptional, z.string().url('GOOGLE_REDIRECT_URI debe ser una URL válida').optional()),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.preprocess(sanitizeOptional, z.string().email('GOOGLE_SERVICE_ACCOUNT_EMAIL inválido').optional()),
  GOOGLE_SERVICE_ACCOUNT_KEY: z.preprocess(sanitizeOptional, z.string().optional()),
  GOOGLE_ADMIN_EMAIL: z.preprocess(sanitizeOptional, z.string().email().optional()),
  USE_CLASSROOM_MOCK: z.preprocess(sanitizeOptional, z.string().optional()),
  CORS_ORIGIN: z.preprocess(sanitizeOptional, z.string().default('*')),
  DATABASE_URL: z.preprocess(sanitizeOptional, z.string().url().optional()),
  NOTIFIER_WEBHOOK_URL: z.preprocess(sanitizeOptional, z.string().url().optional())
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Error al validar variables de entorno', parsed.error.flatten().fieldErrors);
  throw new Error('Variables de entorno inválidas');
}

const env = parsed.data;

export { env };
