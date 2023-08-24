import { Router } from 'express';
const router = Router();
import controller from '../controllers/user.controller';
import { validateUserData } from '../middleware/validator';

//user
router.post('/', validateUserData, controller.create);
router.get('/', controller.getAll);

//POSTs
router.post('/:id/posts', controller.createUserPost);
router.get('/:id/posts', controller.getUserPost);

export default router;
