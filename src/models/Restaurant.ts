import { Schema, model, Document } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  description?: string;
  logoUrl?: string;
  cuisine: string[];
  isActive: boolean;
  ownerId?: Schema.Types.ObjectId;
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    logoUrl: { type: String },
    cuisine: [{ type: String }],
    isActive: { type: Boolean, default: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default model<IRestaurant>('Restaurant', restaurantSchema);