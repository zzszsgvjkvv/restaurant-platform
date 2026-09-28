import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
  // POST /api/v1/products
  static async createProduct(req: Request, res: Response) {
    try {
      const imageUrl = (req as any).file?.path;
      const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
      const restaurantId = data.restaurantId || req.body.restaurantId;

      if (!restaurantId) {
        res.status(400).json({ success: false, message: 'restaurantId is required' });
        return;
      }

      const product = await ProductService.createProduct(restaurantId, data, imageUrl);
      res.status(201).json({ success: true, data: product });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // PUT /api/v1/products/:id
  static async updateProduct(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const imageUrl = (req as any).file?.path;
      const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;

      const updated = await ProductService.updateProduct(id, data, imageUrl);
      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /api/v1/products/:id
  static async deleteProduct(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const result = await ProductService.deleteProduct(id);
      res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}