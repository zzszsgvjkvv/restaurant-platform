import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  savedAddresses?: Array<{
    label?: string;
    address: string;
    location?: { lat: number; lng: number };
  }>;
  paymentMethods?: Array<{
    provider: string; // e.g. "card", "cash_on_delivery"
    isDefault?: boolean;
  }>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const customerSchema = new Schema<ICustomer>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    savedAddresses: [
      {
        label: String,
        address: String,
        location: { lat: Number, lng: Number }
      }
    ],
    paymentMethods: [
      {
        provider: String,
        isDefault: Boolean
      }
    ]
  },
  { timestamps: true }
);

// Hash password before saving
customerSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
});


// Instance method to check password
customerSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<ICustomer>('Customer', customerSchema);