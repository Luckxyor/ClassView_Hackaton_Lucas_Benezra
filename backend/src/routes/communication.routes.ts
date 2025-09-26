import { Router } from 'express';
import { postNotification } from '@controllers/communication.controller';
import { asyncHandler } from '@utils/asyncHandler';

const communicationRouter = Router();

communicationRouter.post('/', asyncHandler(postNotification));

export { communicationRouter };
