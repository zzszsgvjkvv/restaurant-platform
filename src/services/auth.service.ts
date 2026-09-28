import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export class AuthService {
  // Generate JWT Token
  private static generateToken(user: IUser): string {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      restaurantId: user.restaurantId || null,
    };

    return jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
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

    const token = this.generateToken(user);

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

    const token = this.generateToken(user);

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