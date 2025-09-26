import { Router } from 'express';
import { getProgress } from '@controllers/progress.controller';
import { asyncHandler } from '@utils/asyncHandler';

const progressRouter = Router();

progressRouter.get('/', asyncHandler(getProgress));

export { progressRouter };
