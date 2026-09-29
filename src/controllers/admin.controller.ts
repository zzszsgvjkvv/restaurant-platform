import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';

export class AdminController {
  // POST /api/v1/admin/restaurants
  static async createRestaurant(req: Request, res: Response): Promise<void> {
    try {
      // 1. التقاط الرابط بطريقة مرنة (تغطية الحالات المختلفة لـ Multer Cloudinary)
      const file = (req as any).file;
      const logoUrl = file?.path || file?.secure_url || file?.url;

      // 2. معالجة وتأمين استخراج البيانات القادمة من multipart/form-data
      let data: any;
      if (req.body.data) {
        try {
          data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body.data;
        } catch (parseError) {
          res.status(400).json({ 
            success: false, 
            message: 'Invalid JSON format provided in the "data" field.' 
          });
          return;
        }
      } else {
        // إذا أرسل العميل الحقول مفرودة مباشرة في الـ body دون تغليفها بكلمة data
        data = req.body;
      }

      // 3. التحقق من وجود البيانات الأساسية قبل إرسالها للـ Service
      if (!data || Object.keys(data).length === 0) {
        res.status(400).json({ success: false, message: 'Restaurant data is missing.' });
        return;
      }

      // 4. تنفيذ عملية الحفظ في قاعدة البيانات
      const restaurant = await AdminService.createRestaurant(data, logoUrl);
      
      // 5. إرجاع الرد بصيغة JSON فوراً وإغلاق الطلب بنجاح
      res.status(201).json({ success: true, data: restaurant });
    } catch (error: any) {
      console.error("❌ Create Restaurant Controller Error:", error);
      res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
  }

  // PUT /api/v1/admin/restaurants/:id
  static async updateRestaurant(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const logoUrl = (req as any).file?.path;
      const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

      const updated = await AdminService.updateRestaurant(id, data, logoUrl);
      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /api/v1/admin/restaurants/:id
  static async deleteRestaurant(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const result = await AdminService.deleteRestaurant(id);
      res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}