import { Router } from 'express';
import { getMetrics } from '@controllers/metrics.controller';
import { asyncHandler } from '@utils/asyncHandler';

const metricsRouter = Router();

metricsRouter.get('/', asyncHandler(getMetrics));

export { metricsRouter };
