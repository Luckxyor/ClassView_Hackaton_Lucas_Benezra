import type { NextFunction, Request, Response } from 'express';
import pino from 'pino';

const logger = pino();

export function errorHandler (err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  logger.error({ err }, 'Error no controlado');
  res.status(500).json({ message: 'Error interno del servidor' });
}
