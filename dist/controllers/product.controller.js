"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
class ProductController {
    // POST /api/v1/products
    static async createProduct(req, res) {
        try {
            const imageUrl = req.file?.path;
            const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
            const restaurantId = data.restaurantId || req.body.restaurantId;
            if (!restaurantId) {
                res.status(400).json({ success: false, message: 'restaurantId is required' });
                return;
            }
            const product = await product_service_1.ProductService.createProduct(restaurantId, data, imageUrl);
            res.status(201).json({ success: true, data: product });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    // PUT /api/v1/products/:id
    static async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const imageUrl = req.file?.path;
            const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
            const updated = await product_service_1.ProductService.updateProduct(id, data, imageUrl);
            res.status(200).json({ success: true, data: updated });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    // DELETE /api/v1/products/:id
    static async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            const result = await product_service_1.ProductService.deleteProduct(id);
            res.status(200).json({ success: true, ...result });
        }
        catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map