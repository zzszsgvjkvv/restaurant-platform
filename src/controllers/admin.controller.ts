import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';

export class AdminController {
  // POST /api/v1/admin/restaurants
  static async createRestaurant(req: Request, res: Response) {
    try {
      const logoUrl = (req as any).file?.path;
      const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

      const restaurant = await AdminService.createRestaurant(data, logoUrl);
      res.status(201).json({ success: true, data: restaurant });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
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