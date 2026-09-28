"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("../services/admin.service");
class AdminController {
    // POST /api/v1/admin/restaurants
    static async createRestaurant(req, res) {
        try {
            const logoUrl = req.file?.path;
            const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
            const restaurant = await admin_service_1.AdminService.createRestaurant(data, logoUrl);
            res.status(201).json({ success: true, data: restaurant });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    // PUT /api/v1/admin/restaurants/:id
    static async updateRestaurant(req, res) {
        try {
            const id = req.params.id;
            const logoUrl = req.file?.path;
            const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
            const updated = await admin_service_1.AdminService.updateRestaurant(id, data, logoUrl);
            res.status(200).json({ success: true, data: updated });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    // DELETE /api/v1/admin/restaurants/:id
    static async deleteRestaurant(req, res) {
        try {
            const id = req.params.id;
            const result = await admin_service_1.AdminService.deleteRestaurant(id);
            res.status(200).json({ success: true, ...result });
        }
        catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map