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
//# sourceMappingURL=customer_service.d.ts.map