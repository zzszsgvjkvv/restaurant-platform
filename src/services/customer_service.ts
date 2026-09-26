import Customer, { ICustomer } from '../models/Customer';

export class CustomerService {
  // Registers a new customer in the database
  static async createCustomer(customerData: Partial<ICustomer>): Promise<ICustomer> {
    const existingCustomer = await Customer.findOne({ email: customerData.email ??"" });
    if (existingCustomer) {
      throw new Error('Customer with this email already exists');
    }
    
    const customer = new Customer(customerData);
    return await customer.save();
  }

  // Fetches customer profile by ID
  static async getCustomerById(id: string): Promise<ICustomer | null> {
    return await Customer.findById(id);
  }
}