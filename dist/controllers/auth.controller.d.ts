import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare class AuthController {
    static register(req: AuthRequest, res: Response): Promise<void>;
    static login(req: AuthRequest, res: Response): Promise<void>;
    static getMe(req: AuthRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map