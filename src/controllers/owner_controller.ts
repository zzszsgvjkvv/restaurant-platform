import { Request, Response } from 'express';
import { OwnerService } from '../services/owner';
import 'multer'; 
export class OwnerController {
  // POST /api/v1/owner/restaurants
  static async createRestaurant(req: Request, res: Response) {
  try {
      const logoUrl = req.file?.path; // Now TypeScript recognizes req.file
      const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

      const restaurant = await OwnerService.createRestaurant(data, logoUrl);
      res.status(201).json({ success: true, data: restaurant });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  
  }

  // POST /api/v1/owner/restaurants/:id/branches
  static async addBranch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const restaurant = await OwnerService.addBranch(id as string, req.body);
      res.status(200).json({ success: true, data: restaurant });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // POST /api/v1/owner/products
  static async createProduct(req: Request, res: Response) {
    try {
      const imageUrl = req.file?.path; // Cloudinary image URL
      const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

      const product = await OwnerService.createProduct(data, imageUrl);
      res.status(201).json({ success: true, data: product });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // PUT /api/v1/owner/restaurants/:id
  static async updateRestaurant(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const logoUrl = req.file?.path;
      const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

      const updated = await OwnerService.updateRestaurant(id as string, data, logoUrl);
      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // PUT /api/v1/owner/products/:id
  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const imageUrl = req.file?.path;
      const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

      const updated = await OwnerService.updateProduct(id as string, data, imageUrl);
      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}