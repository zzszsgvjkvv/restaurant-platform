"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerController = void 0;
const owner_1 = require("../services/owner");
class OwnerController {
    // POST /api/v1/owner/restaurants
    static async createRestaurant(req, res) {
        try {
            const logoUrl = req.file?.path; // Cloudinary image URL
            const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
            const restaurant = await owner_1.OwnerService.createRestaurant(data, logoUrl);
            res.status(201).json({ success: true, data: restaurant });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    // POST /api/v1/owner/restaurants/:id/branches
    static async addBranch(req, res) {
        try {
            const id = req.params.id;
            const restaurant = await owner_1.OwnerService.addBranch(id, req.body);
            res.status(200).json({ success: true, data: restaurant });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    // POST /api/v1/owner/products
    static async createProduct(req, res) {
        try {
            const imageUrl = req.file?.path; // Cloudinary image URL
            const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
            const product = await owner_1.OwnerService.createProduct(data, imageUrl);
            res.status(201).json({ success: true, data: product });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    // PUT /api/v1/owner/restaurants/:id
    static async updateRestaurant(req, res) {
        try {
            const id = req.params.id;
            const logoUrl = req.file?.path;
            const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
            const updated = await owner_1.OwnerService.updateRestaurant(id, data, logoUrl);
            res.status(200).json({ success: true, data: updated });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    // PUT /api/v1/owner/products/:id
    static async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const imageUrl = req.file?.path;
            const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
            const updated = await owner_1.OwnerService.updateProduct(id, data, imageUrl);
            res.status(200).json({ success: true, data: updated });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
exports.OwnerController = OwnerController;
//# sourceMappingURL=owner_controller.js.map