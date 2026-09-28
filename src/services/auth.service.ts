

import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';
import User, { IUser } from '../models/User';


export class AuthService {

  private static generateToken(id: string, email: string, restaurantId?: Schema.Types.ObjectId | null, role?: string): string {
    return jwt.sign(
      {
        id,
        email,
        role: role || 'user',
        restaurantId: restaurantId ?? null,
      },
      process.env.JWT_SECRET || 'fallback_secret',
      {
        expiresIn: '7d',
      }
    );
  }

  // Register User
  static async register(data: { name: string; email: string; password: string; role?: 'admin' | 'user'; restaurantId?: string }) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const user = new User(data);
    await user.save();

    const token = this.generateToken(
      user._id.toString(),
      user.email,
      user.restaurantId ,
      user.role ?? 'user'
    );

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

    const token = this.generateToken(
      user._id.toString(),
      user.email,
      user.restaurantId,
      user.role ?? 'user'
    );

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