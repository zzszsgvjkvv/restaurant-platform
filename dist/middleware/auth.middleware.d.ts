import { Request, Response, NextFunction } from 'express';
import { JwtPayload as BuiltInJwtPayload } from 'jsonwebtoken';
export interface JwtPayload extends BuiltInJwtPayload {
    id: string;
    email: string;
    role: 'admin' | 'user';
    restaurantId?: string;
}
export interface JwtPayload {
    id: string;
    email: string;
    role: 'admin' | 'user';
    restaurantId?: string;
}
export interface AuthRequest extends Request {
    user?: JwtPayload;
}
export declare const authenticate: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const authorize: (...roles: ('admin' | 'user')[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const requireRestaurantOwnership: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map