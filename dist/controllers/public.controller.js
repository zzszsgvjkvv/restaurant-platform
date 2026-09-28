"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicController = void 0;
const public_service_1 = require("../services/public.service");
class PublicController {
    // GET /api/v1/public/restaurants
    static async getRestaurants(_req, res) {
        try {
            const data = await public_service_1.PublicService.getActiveRestaurants();
            res.status(200).json({ success: true, count: data.length, data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    // GET /api/v1/public/restaurants/:id
    static async getRestaurantMenu(req, res) {
        try {
            const id = req.params.id;
            const data = await public_service_1.PublicService.getRestaurantWithMenu(id);
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    }
    // GET /api/v1/public/products?category=Burgers&search=cheese
    static async getProducts(req, res) {
        try {
            const { category, search, restaurantId } = req.query;
            const data = await public_service_1.PublicService.getProducts({
                category: category,
                search: search,
                restaurantId: restaurantId,
            });
            res.status(200).json({ success: true, count: data.length, data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    // GET /api/v1/public/products/:id
    static async getProductById(req, res) {
        try {
            const id = req.params.id;
            const data = await public_service_1.PublicService.getProductById(id);
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    }
}
exports.PublicController = PublicController;
//# sourceMappingURL=public.controller.js.map