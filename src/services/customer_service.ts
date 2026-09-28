import Customer  from '../models/Customer';
import jwt from 'jsonwebtoken';

export class AuthService {
  static async signup(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    savedAddresses?: any[];
    paymentMethods?: any[];
  }) {
    const existing = await Customer.findOne({ email: data.email });
    if (existing) {
      throw new Error('Customer with this email already exists');
    }

    const customer = new Customer({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      // Optional at signup, added later if provided
      savedAddresses: data.savedAddresses || [], 
      paymentMethods: data.paymentMethods || []
    });

    await customer.save();

    const token = this.generateToken(customer._id.toString(), customer.email);
    return { customer, token };
  }

  static async login(email: string, pass: string) {
    const customer = await Customer.findOne({ email }).select('+password');
    if (!customer) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await customer.comparePassword(pass);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken(customer._id.toString(), customer.email);
    
    // Omit password from output
    const userObj = customer.toObject();
    delete (userObj as any).password;

    return { customer: userObj, token };
  }

  private static generateToken(id: string, email: string): string {
    return jwt.sign({ id, email }, process.env.JWT_SECRET || 'fallback_secret', {
      expiresIn: '7d'
    });
  }
}




