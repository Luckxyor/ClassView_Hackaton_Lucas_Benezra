import express, { type Request, type Response } from 'express';
import cors from 'cors';
// Importación compatible con distintos modos de compilación ESM/CJS de helmet
import * as helmet from 'helmet';
import morgan from 'morgan';
import { env } from '@config/env';
import { apiRouter } from '@routes/index';
import { errorHandler } from '@middlewares/errorHandler';

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN }));
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
