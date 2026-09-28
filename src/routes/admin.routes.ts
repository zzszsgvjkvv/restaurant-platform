import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload';

const router = Router();

// Require JWT and Admin role for all admin routes
router.use(authenticate, authorize('admin'));

router.post('/restaurants', upload.single('logo'), AdminController.createRestaurant);
router.put('/restaurants/:id', upload.single('logo'), AdminController.updateRestaurant);
router.delete('/restaurants/:id', AdminController.deleteRestaurant);

export default router;