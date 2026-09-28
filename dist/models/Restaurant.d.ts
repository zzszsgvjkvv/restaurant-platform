import mongoose, { Document } from 'mongoose';
export interface IBranch {
    _id?: string;
    name: string;
    address: string;
    location?: {
        lat: number;
        lng: number;
    };
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
declare const _default: mongoose.Model<IRestaurant, {}, {}, {}, Document<unknown, {}, IRestaurant, {}, mongoose.DefaultSchemaOptions> & IRestaurant & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IRestaurant>;
export default _default;
//# sourceMappingURL=Restaurant.d.ts.map