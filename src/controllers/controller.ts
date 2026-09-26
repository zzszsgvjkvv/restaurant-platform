import { Request, Response } from 'express';
import { CustomerService } from '../services/customer_service';

export class CustomerController {
  static async register(req: Request, res: Response) {
    try {
      // In a real app, you would validate req.body here using Zod or Joi
      const customer = await CustomerService.createCustomer(req.body);
      
      res.status(201).json({
        success: true,
        data: customer
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}