"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = exports.AuthService = void 0;
const Customer_1 = __importDefault(require("../models/Customer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const Product_1 = __importDefault(require("../models/Product"));
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
class CatalogService {
    // Fetch active restaurants and branches
    static async getRestaurants() {
        return await Restaurant_1.default.find({ status: 'active' });
    }
    static async CreateRestaurants() {
        // CLOUDINARY_URL=cloudinary://576411536873293:**********@cjjr5a65
    }
    // Fetch products, optionally filtered by restaurant or branch
    static async getProducts(filter) {
        const query = { isAvailable: true };
        if (filter.restaurantId)
            query.restaurantId = filter.restaurantId;
        if (filter.category)
            query.category = filter.category;
        return await Product_1.default.find(query).populate('restaurantId', 'name logoUrl');
    }
}
exports.CatalogService = CatalogService;
//# sourceMappingURL=customer_service.js.map