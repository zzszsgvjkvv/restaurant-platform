import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  restaurantId: Schema.Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, index: true },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<IProduct>('Product', productSchema);