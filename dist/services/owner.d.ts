import { IRestaurant, IBranch } from '../models/Restaurant';
import { IProduct } from '../models/Product';
import 'multer';
export declare class OwnerService {
    static createRestaurant(data: Partial<IRestaurant>, logoUrl?: string): Promise<import("mongoose").Document<unknown, {}, IRestaurant, {}, import("mongoose").DefaultSchemaOptions> & IRestaurant & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    static addBranch(restaurantId: string, branchData: IBranch): Promise<import("mongoose").Document<unknown, {}, IRestaurant, {}, import("mongoose").DefaultSchemaOptions> & IRestaurant & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    static createProduct(productData: Partial<IProduct>, imageUrl?: string): Promise<import("mongoose").Document<unknown, {}, IProduct, {}, import("mongoose").DefaultSchemaOptions> & IProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    static updateRestaurant(restaurantId: string, updateData: Partial<IRestaurant>, logoUrl?: string): Promise<import("mongoose").Document<unknown, {}, IRestaurant, {}, import("mongoose").DefaultSchemaOptions> & IRestaurant & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    static updateProduct(productId: string, updateData: Partial<IProduct>, imageUrl?: string): Promise<import("mongoose").Document<unknown, {}, IProduct, {}, import("mongoose").DefaultSchemaOptions> & IProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
//# sourceMappingURL=owner.d.ts.map