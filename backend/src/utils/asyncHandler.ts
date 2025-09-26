import type { Request, Response, NextFunction, RequestHandler } from 'express';

export function asyncHandler (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
