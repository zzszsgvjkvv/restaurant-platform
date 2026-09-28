import { Request, Response } from 'express';
import { AuthService, CatalogService } from '../services/customer_service';
import 'multer'
export class CustomerController {
  // POST /api/v1/customer/signup
  static async signup(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, phone, location, address, paymentMethod } = req.body;

      const savedAddresses = address ? [{ address, location }] : [];
      const paymentMethods = paymentMethod ? [{ provider: paymentMethod }] : [];

      const result = await AuthService.signup({
        firstName,
        lastName,
        email,
        password,
        phone,
        savedAddresses,
        paymentMethods
      });

      res.status(201).json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // POST /api/v1/customer/login
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /api/v1/customer/restaurants
  static async getRestaurants(req: Request, res: Response) {
    try {
      const restaurants = await CatalogService.getRestaurants();
      res.status(200).json({ success: true, data: restaurants });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
    static async CreateRestaurants(req: Request, res: Response) {
    try {
      
      const restaurants = await CatalogService.CreateRestaurants();
      res.status(200).json({ success: true, data: restaurants });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /api/v1/customer/products
  static async getProducts(req: Request, res: Response) {
    try {
      
      const { restaurantId, category } = req.query;
      const products = await CatalogService.getProducts({
        restaurantId: restaurantId as string,
        category: category as string
      });
      res.status(200).json({ success: true, data: products });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}