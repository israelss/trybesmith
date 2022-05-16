import { Router } from 'express';
import { OrderController } from '../controllers';
import { orderValidation, userValidation } from '../middlewares';

const router = Router();

const controller = new OrderController();

router.get('/', controller.getAll);

router.post(
  '/',
  userValidation.token,
  orderValidation.productsIds,
  controller.create,
);

export default router;