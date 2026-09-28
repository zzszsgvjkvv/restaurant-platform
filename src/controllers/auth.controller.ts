import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { AuthService } from '../services/auth.service';

export class AuthController {
  // POST /api/v1/auth/register
  static async register(req: AuthRequest, res: Response) {
    try {
      const { name, email, password, role, restaurantId } = req.body;
      if (!name || !email || !password) {
        res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
        return;
      }

      const result = await AuthService.register({ name, email, password, role, restaurantId });
      res.status(201).json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // POST /api/v1/auth/login
  static async login(req: AuthRequest, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required.' });
        return;
      }


      const result = await AuthService.login(email, password);
      res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  }

  // GET /api/v1/auth/me
  static async getMe(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Not authenticated.' });
        return;
      }

      const user = await AuthService.getProfile(req.user.id);
      res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}