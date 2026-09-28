import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Public auth routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Protected profile route
router.get('/me', authenticate, AuthController.getMe);

export default router;