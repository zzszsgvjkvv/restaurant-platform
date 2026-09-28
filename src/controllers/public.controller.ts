import { Request, Response } from 'express';
import { PublicService } from '../services/public.service';

export class PublicController {
  // GET /api/v1/public/restaurants
  static async getRestaurants(_req: Request, res: Response) {
    try {
      const data = await PublicService.getActiveRestaurants();
      res.status(200).json({ success: true, count: data.length, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  

  // GET /api/v1/public/restaurants/:id
  static async getRestaurantMenu(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const data = await PublicService.getRestaurantWithMenu(id);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  // GET /api/v1/public/products?category=Burgers&search=cheese
  static async getProducts(req: Request, res: Response) {
    try {
      const { category, search, restaurantId } = req.query;
      const data = await PublicService.getProducts({
        category: category as string,
        search: search as string,
        restaurantId: restaurantId as string,
      });
      res.status(200).json({ success: true, count: data.length, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /api/v1/public/products/:id
  static async getProductById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const data = await PublicService.getProductById(id);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }
}