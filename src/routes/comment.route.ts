import { Router } from 'express';
const router = Router();
import controller from '../controllers/comment.controller';
import middleware from '../middleware/index';
import { handleError } from '../middleware/error';
import {
  validateCreateComment,
  validateGetComment,
} from '../middleware/validator';

router.post(
  '/:postId/comments',
  handleError(middleware.verifyBearer),
  validateCreateComment,
  handleError(controller.addComment)
);

export default router;
