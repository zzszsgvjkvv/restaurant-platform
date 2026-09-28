"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicService = void 0;
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const Product_1 = __importDefault(require("../models/Product"));
class PublicService {
    // Get all active restaurants
    static async getActiveRestaurants() {
        return await Restaurant_1.default.find({ isActive: true }).select('-__v');
    }
    // Get single restaurant by ID with its products
    static async getRestaurantWithMenu(restaurantId) {
        const restaurant = await Restaurant_1.default.findOne({ _id: restaurantId, isActive: true });
        if (!restaurant)
            throw new Error('Restaurant not found or inactive');
        const products = await Product_1.default.find({ _id: restaurantId, isAvailable: true }).select('-__v');
        return { restaurant, products };
    }
    // Get products with optional search and category filters across restaurants
    static async getProducts(query) {
        const filter = { isAvailable: true };
        if (query.restaurantId)
            filter.restaurantId = query.restaurantId;
        if (query.category)
            filter.category = query.category;
        if (query.search)
            filter.name = { $regex: query.search, $options: 'i' };
        return await Product_1.default.find(filter).populate('restaurantId', 'name logoUrl').select('-__v');
    }
    // Get single product details
    static async getProductById(productId) {
        const product = await Product_1.default.findById(productId).populate('restaurantId', 'name logoUrl');
        if (!product || !product.isAvailable)
            throw new Error('Product not found');
        return product;
    }
}
exports.PublicService = PublicService;
//# sourceMappingURL=public.service.js.map