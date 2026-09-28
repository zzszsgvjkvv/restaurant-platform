export declare class CatalogService {
    static getRestaurants(): Promise<(import("mongoose").Document<unknown, {}, import("../models/Restaurant").IRestaurant, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Restaurant").IRestaurant & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    static getProducts(filter: {
        restaurantId?: string;
        category?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, import("../models/Product").IProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Product").IProduct & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
//# sourceMappingURL=catalogService.d.ts.map