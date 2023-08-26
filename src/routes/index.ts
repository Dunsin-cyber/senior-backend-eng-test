import { Router } from 'express';
import User from './user.route';
import Comment from './comment.route';
import Optimizer from './optimizer.route';

const router = Router();

router.use('/users', User);
router.use('/posts', Comment);
router.use('/optimizer', Optimizer);

export default router;
