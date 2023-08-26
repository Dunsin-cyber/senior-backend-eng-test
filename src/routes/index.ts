import { Router } from 'express';
import User from './user.route';
import Comment from './comment.route';

const router = Router();

router.use('/users', User);
router.use('/posts', Comment);

export default router;
