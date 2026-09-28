import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: string;
  email: string;
  role: 'admin' | 'user';
  restaurantId?: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

// 1. Authenticate Token
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback_secret'
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

// 2. Authorize Roles (RBAC)
export const authorize = (...roles: ('admin' | 'user')[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'User not authenticated.' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden. Role '${req.user.role}' is not authorized to perform this action.`,
      });
      return;
    }

    next();
  };
};

// 3. Ensure User interacts only with their assigned restaurant
export const requireRestaurantOwnership = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'User not authenticated.' });
    return;
  }

  // Admins bypass restaurant restriction
  if (req.user.role === 'admin') {
    return next();
  }

  const targetRestaurantId = req.params.restaurantId || req.body.restaurantId;

  if (!req.user.restaurantId || req.user.restaurantId !== targetRestaurantId) {
    res.status(403).json({
      success: false,
      message: 'Forbidden. You do not have permission to manage this restaurant.',
    });
    return;
  }

  next();
};