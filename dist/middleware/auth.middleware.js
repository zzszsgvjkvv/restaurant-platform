"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRestaurantOwnership = exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 1. Authenticate Token
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        return;
    }
    // FIX 1: Access the index [1] directly and guarantee it's a string
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ success: false, message: 'Access denied. Malformed token format.' });
        return;
    }
    // FIX 2: Explicitly isolate the secret as a clean string variable
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};
exports.authenticate = authenticate;
// 2. Authorize Roles (RBAC)
const authorize = (...roles) => {
    return (req, res, next) => {
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
exports.authorize = authorize;
// 3. Ensure User interacts only with their assigned restaurant
const requireRestaurantOwnership = (req, res, next) => {
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
exports.requireRestaurantOwnership = requireRestaurantOwnership;
//# sourceMappingURL=auth.middleware.js.map