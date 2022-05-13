import { Router } from 'express';
import { ProductController } from '../controllers';
import { productValidation } from '../middlewares';

const router = Router();

const controller = new ProductController();

router.get('/', controller.getAll);

router.post(
  '/',
  productValidation.name,
  productValidation.amount,
  controller.create,
);

export default router;