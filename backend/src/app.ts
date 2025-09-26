import express, { type Request, type Response } from 'express';
import cors from 'cors';
// Importación compatible con distintos modos de compilación ESM/CJS de helmet
import * as helmet from 'helmet';
import morgan from 'morgan';
import { env } from '@config/env';
import { apiRouter } from '@routes/index';
import { errorHandler } from '@middlewares/errorHandler';

const app = express();

const parseOrigins = (rawOrigins: string): string[] => {
  return rawOrigins
    .split(',')
    .map(origin => origin.trim())
    .filter(origin => origin.length > 0);
};

const escapeRegex = (value: string): string => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const allowedOrigins = parseOrigins(env.CORS_ORIGIN);
const allowAllOrigins = allowedOrigins.length === 0 || allowedOrigins.includes('*');
const explicitOrigins = allowedOrigins.filter(origin => !origin.includes('*'));
const wildcardRegexes = allowedOrigins
  .filter(origin => origin !== '*' && origin.includes('*'))
  .map(origin => new RegExp(`^${origin.split('*').map(escapeRegex).join('.*')}$`));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowAllOrigins) {
      callback(null, true);
      return;
    }

    if (explicitOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    if (wildcardRegexes.some(regex => regex.test(origin))) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origen ${origin} no permitido por CORS`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(express.json({ limit: '1mb' }));
// Algunas toolchains ESM transpilan helmet como namespace con .default
// Esto evita el error TS2349 (no callable) en builds estrictos
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const helmetMiddleware = (helmet as any).default ? (helmet as any).default() : (helmet as any)();
app.use(helmetMiddleware);
app.use(morgan('dev'));

app.use('/api', apiRouter);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use(errorHandler);

export { app };
