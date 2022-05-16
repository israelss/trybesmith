import { Router } from 'express';
import { OrderController } from '../controllers';

const router = Router();

const controller = new OrderController();

router.get('/', controller.getAll);

export default router;