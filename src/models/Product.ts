import mongoose, { Document, Schema } from 'mongoose';

export interface IProductOption {
  name: string; // e.g. "Cheese", "Size"
  extraPrice: number;
}

export interface IProduct extends Document {
  restaurantId: mongoose.Types.ObjectId;
  branchId?: mongoose.Types.ObjectId;
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  category: string;
  isAvailable: boolean;
  options?: IProductOption[];
}

const productSchema = new Schema<IProduct>(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    branchId: { type: Schema.Types.ObjectId, ref: 'Restaurant.branches' },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    options: [
      {
        name: String,
        extraPrice: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);