import { Router } from 'express';
const router = Router();
import controller from '../controllers/comment.controller';
// import middleware from '../middleware/index'

router.post('/', controller.addComment);

export default router;
