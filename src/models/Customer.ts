import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  savedAddresses: Array<{
    label: string;
    location: { lat: number; lng: number };
    address: string;
  }>;
}

const customerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  savedAddresses: [{
    label: String,
    location: { lat: Number, lng: Number },
    address: String
  }]
}, { timestamps: true });

export default mongoose.model<ICustomer>('Customer', customerSchema);