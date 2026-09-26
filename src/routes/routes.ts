import { Router } from 'express';
import { CustomerController } from '../controllers/controller';

const router = Router();

router.post('/register', CustomerController.register);

export default router;