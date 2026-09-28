import Types from 'mongoose';
import { IRestaurant } from '../models/Restaurant';
export declare class AdminService {
    static createRestaurant(data: Partial<IRestaurant>, logoUrl?: string): Promise<Types.Document<unknown, {}, IRestaurant, {}, Types.DefaultSchemaOptions> & IRestaurant & Required<{
        _id: Types.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    static updateRestaurant(restaurantId: string, updateData: Partial<IRestaurant>, logoUrl?: string): Promise<Types.Document<unknown, {}, IRestaurant, {}, Types.DefaultSchemaOptions> & IRestaurant & Required<{
        _id: Types.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    static deleteRestaurant(restaurantId: Types.Types.ObjectId | string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=admin.service.d.ts.map