import { Router } from 'express';
import { UserController } from '../controllers';
import { userValidation } from '../middlewares';

const router = Router();

const controller = new UserController();

router.post(
  '/',
  userValidation.username,
  userValidation.password,
  userValidation.checkUser,
  controller.login,
);

export default router;