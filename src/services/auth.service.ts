
// export class AuthService {
//   static async signup(data: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     phone: string;
//     savedAddresses?: any[];
//     paymentMethods?: any[];
//   }) {
//     const existing = await Customer.findOne({ email: data.email });
//     if (existing) {
//       throw new Error('Customer with this email already exists');
//     }

//     const customer = new Customer({
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       password: data.password,
//       phone: data.phone,
//       // Optional at signup, added later if provided
//       savedAddresses: data.savedAddresses || [],
//       paymentMethods: data.paymentMethods || []
//     });

//     await customer.save();

//     const token = this.generateToken(customer._id.toString(), customer.email);
//     return { customer, token };
//   }

//   static async login(email: string, pass: string) {
//     const customer = await Customer.findOne({ email }).select('+password');
//     if (!customer) {
//       throw new Error('Invalid email or password');
//     }

//     const isMatch = await customer.comparePassword(pass);
//     if (!isMatch) {
//       throw new Error('Invalid email or password');
//     }

//     const token = this.generateToken(customer._id.toString(), customer.email);
    
//     // Omit password from output
//     const userObj = customer.toObject();
//     delete (userObj as any).password;

//     return { customer: userObj, token };
//   }

//   private static generateToken(id: string, email: string): string {
//     return jwt.sign({ id, email }, process.env.JWT_SECRET || 'fallback_secret', {
//       expiresIn: '7d'
//     });
//   }
// }





import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export class AuthService {
  // Generate JWT Token
//   private static generateToken(user: IUser): string {
//     const payload = {
//       id: user._id,
//       email: user.email,
//       role: user.role,
//       restaurantId: user.restaurantId || null,
//     };

//     return jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', {
//       expiresIn: process.env.JWT_EXPIRES_IN || '7d',
//     });
//   }
  private static generateToken(id: string, email: string): string {
    return jwt.sign({ id, email }, process.env.JWT_SECRET || 'fallback_secret', {
      expiresIn: '7d'
    });
  }

  // Register User
  static async register(data: { name: string; email: string; password: string; role?: 'admin' | 'user'; restaurantId?: string }) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const user = new User(data);
    await user.save();

    const token = this.generateToken(user._id.toString(), user.email);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurantId,
      },
    };
  }

  // Login User
  static async login(email: string, password: string) {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }

    const token = this.generateToken(user._id.toString(), user.email);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurantId,
      },
    };
  }

  // Get Current Profile
  static async getProfile(userId: string) {
    const user = await User.findById(userId).populate('restaurantId', 'name logoUrl');
    if (!user) throw new Error('User not found.');
    return user;
  }

}