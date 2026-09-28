"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const Customer_1 = __importDefault(require("../models/Customer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static async signup(data) {
        const existing = await Customer_1.default.findOne({ email: data.email });
        if (existing) {
            throw new Error('Customer with this email already exists');
        }
        const customer = new Customer_1.default({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phone: data.phone,
            // Optional at signup, added later if provided
            savedAddresses: data.savedAddresses || [],
            paymentMethods: data.paymentMethods || []
        });
        await customer.save();
        const token = this.generateToken(customer._id.toString(), customer.email);
        return { customer, token };
    }
    static async login(email, pass) {
        const customer = await Customer_1.default.findOne({ email }).select('+password');
        if (!customer) {
            throw new Error('Invalid email or password');
        }
        const isMatch = await customer.comparePassword(pass);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const token = this.generateToken(customer._id.toString(), customer.email);
        // Omit password from output
        const userObj = customer.toObject();
        delete userObj.password;
        return { customer: userObj, token };
    }
    static generateToken(id, email) {
        return jsonwebtoken_1.default.sign({ id, email }, process.env.JWT_SECRET || 'fallback_secret', {
            expiresIn: '7d'
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=customer_service.js.map