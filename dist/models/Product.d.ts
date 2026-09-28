import { Schema, Document } from 'mongoose';
export interface IProduct extends Document {
    restaurantId: Schema.Types.ObjectId;
    name: string;
    description?: string;
    price: number;
    category: string;
    imageUrl?: string;
    isAvailable: boolean;
}
declare const _default: import("mongoose").Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct, {}, import("mongoose").DefaultSchemaOptions> & IProduct & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProduct>;
export default _default;
//# sourceMappingURL=Product.d.ts.map