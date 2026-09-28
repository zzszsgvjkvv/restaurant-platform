"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const mongoose_1 = require("mongoose");
const Product_1 = __importDefault(require("../models/Product"));
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
class ProductService {
    // CREATE Product
    static async createProduct(restaurantId, data, imageUrl) {
        // Validate restaurant existence
        const restaurantExists = await Restaurant_1.default.exists({ _id: restaurantId });
        if (!restaurantExists)
            throw new Error('Target restaurant does not exist');
        const product = new Product_1.default({
            ...data,
            restaurantId: new mongoose_1.Types.ObjectId(restaurantId), // Cast string to Schema.Types.ObjectId
            imageUrl: imageUrl || data.imageUrl,
        });
        return await product.save();
    }
    // UPDATE Product
    static async updateProduct(productId, updateData, imageUrl) {
        if (imageUrl)
            updateData.imageUrl = imageUrl;
        const updatedProduct = await Product_1.default.findByIdAndUpdate(productId, { $set: updateData }, { new: true, runValidators: true });
        if (!updatedProduct)
            throw new Error('Product not found');
        return updatedProduct;
    }
    // DELETE Product
    static async deleteProduct(productId) {
        const deletedProduct = await Product_1.default.findByIdAndDelete(productId);
        if (!deletedProduct)
            throw new Error('Product not found');
        return { message: 'Product deleted successfully' };
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map