import { Router } from 'express';
const router = Router();
import controller from '../controllers/optimizer.controller';
import { handleError } from '../middleware/error';
import middleware from '../middleware';

router.get(
  '/',
  handleError(middleware.verifyBearer),
  handleError(controller.optimize)
);

export default router;
