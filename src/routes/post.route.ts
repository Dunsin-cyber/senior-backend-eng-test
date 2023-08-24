import { Router } from 'express';
const router = Router();
import controller from '../controllers/post.controller';
// import middleware from '../middleware/index'

router.post('/:postId/comments', controller.addComment);

router.get('/:postId/comments', controller.getComments);

export default router;
