import { Router } from 'express';
const router = Router();
import controller from '../controllers/user.controller';
import {
  validateUserData,
  validatePostData,
  validateLoginData,
  validateGetData,
} from '../middleware/validator';
import { handleError } from '../middleware/error';
import middleware from '../middleware';

//user
router.post('/', validateUserData, handleError(controller.create));
router.get('/:id', middleware.verifyBearer, handleError(controller.getAUser));
router.get('/', middleware.verifyBearer, handleError(controller.getAllUsers));
router.post('/login', validateLoginData, handleError(controller.logIn));
//POSTs
router.post(
  '/:id/posts',
  validatePostData,
  middleware.verifyBearer,
  handleError(controller.createUserPost)
);
router.get(
  '/:id/posts',
  validateGetData,
  middleware.verifyBearer,
  handleError(controller.getUserPost)
);

export default router;
