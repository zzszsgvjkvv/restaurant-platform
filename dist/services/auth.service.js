"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
class AuthService {
    static generateToken(id, email, restaurantId, role) {
        return jsonwebtoken_1.default.sign({
            id,
            email,
            role: role || 'user',
            restaurantId: restaurantId ?? null,
        }, process.env.JWT_SECRET || 'fallback_secret', {
            expiresIn: '7d',
        });
    }
    // Register User
    static async register(data) {
        const existingUser = await User_1.default.findOne({ email: data.email });
        if (existingUser) {
            throw new Error('User with this email already exists.');
        }
        const user = new User_1.default(data);
        await user.save();
        const token = this.generateToken(user._id.toString(), user.email, user.restaurantId, user.role ?? 'user');
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                restaurantId: user.restaurantId,
            },
        };
    }
    // Login User
    static async login(email, password) {
        const user = await User_1.default.findOne({ email }).select('+password');
        if (!user) {
            throw new Error('Invalid email or password.');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid email or password.');
        }
        const token = this.generateToken(user._id.toString(), user.email, user.restaurantId, user.role ?? 'user');
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                restaurantId: user.restaurantId,
            },
        };
    }
    // Get Current Profile
    static async getProfile(userId) {
        const user = await User_1.default.findById(userId).populate('restaurantId', 'name logoUrl');
        if (!user)
            throw new Error('User not found.');
        return user;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map