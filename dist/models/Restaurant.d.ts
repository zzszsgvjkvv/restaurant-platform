import { Schema, Document } from 'mongoose';
export interface IRestaurant extends Document {
    name: string;
    description?: string;
    logoUrl?: string;
    cuisine: string[];
    isActive: boolean;
    ownerId?: Schema.Types.ObjectId;
}
declare const _default: import("mongoose").Model<IRestaurant, {}, {}, {}, Document<unknown, {}, IRestaurant, {}, import("mongoose").DefaultSchemaOptions> & IRestaurant & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IRestaurant>;
export default _default;
//# sourceMappingURL=Restaurant.d.ts.map