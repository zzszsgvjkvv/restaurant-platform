export declare class PublicService {
    static getActiveRestaurants(): Promise<(import("mongoose").Document<unknown, {}, import("../models/Restaurant").IRestaurant, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Restaurant").IRestaurant & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    static getRestaurantWithMenu(restaurantId: string): Promise<{
        restaurant: import("mongoose").Document<unknown, {}, import("../models/Restaurant").IRestaurant, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Restaurant").IRestaurant & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        products: (import("mongoose").Document<unknown, {}, import("../models/Product").IProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Product").IProduct & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    static getProducts(query: {
        category?: string;
        search?: string;
        restaurantId?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, import("../models/Product").IProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Product").IProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    static getProductById(productId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/Product").IProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Product").IProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
//# sourceMappingURL=public.service.d.ts.map