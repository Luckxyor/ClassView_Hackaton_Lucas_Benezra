import { Router } from 'express';
import { progressRouter } from '@routes/progress.routes';
import { communicationRouter } from '@routes/communication.routes';
import { metricsRouter } from '@routes/metrics.routes';

const apiRouter = Router();

apiRouter.use('/progress', progressRouter);
apiRouter.use('/communications', communicationRouter);
apiRouter.use('/metrics', metricsRouter);

export { apiRouter };
