import mongoose, { Document, Schema } from 'mongoose';

export interface IBranch {
  _id?: string;
  name: string;
  address: string;
  location?: { lat: number; lng: number };
  phone: string;
  isOpen: boolean;
}

export interface IRestaurant extends Document {
  name: string;
  description: string;
  logoUrl?: string;
  cuisine: string[];
  status: 'pending' | 'active' | 'suspended';
  branches: IBranch[];
}

const branchSchema = new Schema<IBranch>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: { lat: Number, lng: Number },
  phone: { type: String, required: true },
  isOpen: { type: Boolean, default: true }
});

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    logoUrl: { type: String },
    cuisine: [{ type: String }],
    status: { type: String, enum: ['pending', 'active', 'suspended'], default: 'active' },
    branches: [branchSchema]
  },
  { timestamps: true }
);

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);