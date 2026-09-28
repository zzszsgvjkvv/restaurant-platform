"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerService = void 0;
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const Product_1 = __importDefault(require("../models/Product"));
require("multer");
// import { OwnerService } from '../services/customer_service';
class OwnerService {
    // 1. Create Restaurant
    static async createRestaurant(data, logoUrl) {
        const restaurant = new Restaurant_1.default({
            ...data,
            logoUrl: logoUrl || data.logoUrl
        });
        return await restaurant.save();
    }
    // 2. Add Branch to Restaurant
    static async addBranch(restaurantId, branchData) {
        const restaurant = await Restaurant_1.default.findById(restaurantId);
        if (!restaurant)
            throw new Error('Restaurant not found');
        restaurant.branches.push(branchData);
        await restaurant.save();
        return restaurant;
    }
    // 3. Create Product
    static async createProduct(productData, imageUrl) {
        const product = new Product_1.default({
            ...productData,
            imageUrl: imageUrl || productData.imageUrl
        });
        return await product.save();
    }
    // 4. Update Restaurant (Flexible partial update)
    static async updateRestaurant(restaurantId, updateData, logoUrl) {
        if (logoUrl)
            updateData.logoUrl = logoUrl;
        const updated = await Restaurant_1.default.findByIdAndUpdate(restaurantId, { $set: updateData }, { new: true, runValidators: true });
        if (!updated)
            throw new Error('Restaurant not found');
        return updated;
    }
    // 5. Update Product (Flexible partial update)
    static async updateProduct(productId, updateData, imageUrl) {
        if (imageUrl)
            updateData.imageUrl = imageUrl;
        const updated = await Product_1.default.findByIdAndUpdate(productId, { $set: updateData }, { new: true, runValidators: true });
        if (!updated)
            throw new Error('Product not found');
        return updated;
    }
}
exports.OwnerService = OwnerService;
//# sourceMappingURL=owner.js.map