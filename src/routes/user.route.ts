import { Router } from 'express';
const router = Router();
import controller from '../controllers/user.controller';
import { validateUserData } from '../middleware/validator';
import { handleError } from '../middleware/error';

//user
router.post('/', validateUserData, handleError(controller.create));
router.get('/:id', handleError(controller.getAUser));
router.get('/', handleError(controller.getAllUsers));

//POSTs
router.post('/:id/posts', handleError(controller.createUserPost));
router.get('/:id/posts', handleError(controller.getUserPost));

export default router;
