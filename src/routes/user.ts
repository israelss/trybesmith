import { Router } from 'express';
import { UserController } from '../controllers';
import { userValidation } from '../middlewares';

const router = Router();

const controller = new UserController();

router.post(
  '/',
  userValidation.username,
  userValidation.classe,
  userValidation.level,
  userValidation.password,
  controller.create,
);

export default router;