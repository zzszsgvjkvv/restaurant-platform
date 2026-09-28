import { Router } from 'express';
import { CustomerController } from '../controllers/controller';
import { OwnerController } from '../controllers/owner_controller';
import { upload } from '../middleware/upload';
const router = Router();

// Auth Endpoints 
router.post('/signup', CustomerController.signup);
router.post('/login', CustomerController.login);

// Discovery Endpoints
router.get('/restaurants', CustomerController.getRestaurants);
router.post('/createrestaurants', CustomerController.CreateRestaurants);
router.get('/products', CustomerController.getProducts);




router.post('/restaurants', upload.single('logo'), OwnerController.createRestaurant);
// router.put('/restaurants/:id', upload.single('logo'), OwnerController.updateRestaurant);
router.post('/restaurants/:id/branches', OwnerController.createRestaurant); 

// Products
// router.post('/products', upload.single('image'), OwnerController.createProduct);
// router.put('/products/:id', upload.single('image'), OwnerController.updateProduct);

export default router;