import { Router } from 'express';
import { ProductController } from '../controllers';

const router = Router();

const controller = new ProductController();

router.get('/', controller.getAll);

export default router;