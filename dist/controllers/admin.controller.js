"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("../services/admin.service");
class AdminController {
    // POST /api/v1/admin/restaurants
    static async createRestaurant(req, res) {
        try {
            // 1. التقاط الرابط بطريقة مرنة (تغطية الحالات المختلفة لـ Multer Cloudinary)
            const file = req.file;
            const logoUrl = file?.path || file?.secure_url || file?.url;
            // 2. معالجة وتأمين استخراج البيانات القادمة من multipart/form-data
            let data;
            if (req.body.data) {
                try {
                    data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body.data;
                }
                catch (parseError) {
                    res.status(400).json({
                        success: false,
                        message: 'Invalid JSON format provided in the "data" field.'
                    });
                    return;
                }
            }
            else {
                // إذا أرسل العميل الحقول مفرودة مباشرة في الـ body دون تغليفها بكلمة data
                data = req.body;
            }
            // 3. التحقق من وجود البيانات الأساسية قبل إرسالها للـ Service
            if (!data || Object.keys(data).length === 0) {
                res.status(400).json({ success: false, message: 'Restaurant data is missing.' });
                return;
            }
            // 4. تنفيذ عملية الحفظ في قاعدة البيانات
            const restaurant = await admin_service_1.AdminService.createRestaurant(data, logoUrl);
            // 5. إرجاع الرد بصيغة JSON فوراً وإغلاق الطلب بنجاح
            res.status(201).json({ success: true, data: restaurant });
        }
        catch (error) {
            console.error("❌ Create Restaurant Controller Error:", error);
            res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
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