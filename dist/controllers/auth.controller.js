"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    // POST /api/v1/auth/register
    static async register(req, res) {
        try {
            const { name, email, password, role, restaurantId } = req.body;
            if (!name || !email || !password) {
                res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
                return;
            }
            const result = await auth_service_1.AuthService.register({ name, email, password, role, restaurantId });
            res.status(201).json({ success: true, ...result });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    // POST /api/v1/auth/login
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ success: false, message: 'Email and password are required.' });
                return;
            }
            const result = await auth_service_1.AuthService.login(email, password);
            res.status(200).json({ success: true, ...result });
        }
        catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    }
    // GET /api/v1/auth/me
    static async getMe(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Not authenticated.' });
                return;
            }
            const user = await auth_service_1.AuthService.getProfile(req.user.id);
            res.status(200).json({ success: true, data: user });
        }
        catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map