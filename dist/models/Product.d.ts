import mongoose, { Document } from 'mongoose';
export interface IProductOption {
    name: string;
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
declare const _default: mongoose.Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct, {}, mongoose.DefaultSchemaOptions> & IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProduct>;
export default _default;
//# sourceMappingURL=Product.d.ts.map