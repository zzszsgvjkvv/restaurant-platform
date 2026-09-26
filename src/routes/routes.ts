import { Router } from 'express';
import { CustomerController } from '../controllers/controller';

const router = Router();

// Auth Endpoints
router.post('/signup', CustomerController.signup);
router.post('/login', CustomerController.login);

// Discovery Endpoints
router.get('/restaurants', CustomerController.getRestaurants);
router.get('/products', CustomerController.getProducts);

export default router;