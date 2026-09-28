import mongoose, { Document } from 'mongoose';
export interface ICustomer extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    savedAddresses?: Array<{
        label?: string;
        address: string;
        location?: {
            lat: number;
            lng: number;
        };
    }>;
    paymentMethods?: Array<{
        provider: string;
        isDefault?: boolean;
    }>;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const _default: mongoose.Model<ICustomer, {}, {}, {}, Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICustomer>;
export default _default;
//# sourceMappingURL=Customer.d.ts.map