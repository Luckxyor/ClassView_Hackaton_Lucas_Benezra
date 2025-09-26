import { createServer } from 'node:http';
import { app } from './app';
import { env } from '@config/env';
import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({ colorize: true });
const logger = pino({}, stream);

const port = Number(env.PORT ?? 4000);

const server = createServer(app);

server.listen(port, () => {
  logger.info(`🚀 Backend escuchando en http://localhost:${port}`);
});
