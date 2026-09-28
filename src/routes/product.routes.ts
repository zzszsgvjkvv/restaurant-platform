import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authenticate, authorize, requireRestaurantOwnership } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload';

const router = Router();

// Require JWT authentication for write operations
router.post(
  '/',
  authenticate,
  authorize('admin', 'user'),
  requireRestaurantOwnership,
  upload.single('image'),
  ProductController.createProduct
);

router.put(
  '/:id',
  authenticate,
  authorize('admin', 'user'),
  upload.single('image'),
  ProductController.updateProduct
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin', 'user'),
  ProductController.deleteProduct
);

export default router;
