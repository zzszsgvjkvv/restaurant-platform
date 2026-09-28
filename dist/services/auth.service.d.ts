import { Schema } from 'mongoose';
import { IUser } from '../models/User';
export declare class AuthService {
    private static generateToken;
    static register(data: {
        name: string;
        email: string;
        password: string;
        role?: 'admin' | 'user';
        restaurantId?: string;
    }): Promise<{
        token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: "admin" | "user";
            restaurantId: Schema.Types.ObjectId | undefined;
        };
    }>;
    static login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: "admin" | "user";
            restaurantId: Schema.Types.ObjectId | undefined;
        };
    }>;
    static getProfile(userId: string): Promise<import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map