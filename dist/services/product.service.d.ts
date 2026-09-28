import { Types } from 'mongoose';
import { IProduct } from '../models/Product';
export declare class ProductService {
    static createProduct(restaurantId: string, data: Partial<IProduct>, imageUrl?: string): Promise<import("mongoose").Document<unknown, {}, IProduct, {}, import("mongoose").DefaultSchemaOptions> & IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    static updateProduct(productId: string, updateData: Partial<IProduct>, imageUrl?: string): Promise<import("mongoose").Document<unknown, {}, IProduct, {}, import("mongoose").DefaultSchemaOptions> & IProduct & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    static deleteProduct(productId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=product.service.d.ts.map