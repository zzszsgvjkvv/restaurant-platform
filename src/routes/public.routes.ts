import { Router } from 'express';
import { PublicController } from '../controllers/public.controller';

const router = Router();

// Fully public endpoints (No authentication needed)
router.get('/restaurants', PublicController.getRestaurants);
router.get('/restaurants/:id', PublicController.getRestaurantMenu);
router.get('/products', PublicController.getProducts);
router.get('/products/:id', PublicController.getProductById);

export default router;