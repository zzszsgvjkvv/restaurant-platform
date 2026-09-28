export declare class AuthService {
    static signup(data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
        savedAddresses?: any[];
        paymentMethods?: any[];
    }): Promise<{
        customer: import("mongoose").Document<unknown, {}, import("../models/Customer").ICustomer, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Customer").ICustomer & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        token: string;
    }>;
    static login(email: string, pass: string): Promise<{
        customer: import("../models/Customer").ICustomer & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        token: string;
    }>;
    private static generateToken;
}
export declare class CatalogService {
    static getRestaurants(): Promise<(import("mongoose").Document<unknown, {}, import("../models/Restaurant").IRestaurant, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Restaurant").IRestaurant & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    static CreateRestaurants(): Promise<void>;
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
//# sourceMappingURL=customer_service.d.ts.map