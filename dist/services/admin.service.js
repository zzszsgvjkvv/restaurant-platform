"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = __importDefault(require("../models/User"));
class AdminService {
    // CREATE Restaurant (Admin Only)
    static async createRestaurant(data, logoUrl) {
        const restaurant = new Restaurant_1.default({
            ...data,
            logoUrl: logoUrl || data.logoUrl,
        });
        await restaurant.save();
        // If an ownerId was assigned during creation, link the restaurant to the User model
        if (data.ownerId) {
            await User_1.default.findByIdAndUpdate(data.ownerId, { restaurantId: restaurant._id });
        }
        return restaurant;
    }
    // UPDATE Restaurant
    static async updateRestaurant(restaurantId, updateData, logoUrl) {
        if (logoUrl)
            updateData.logoUrl = logoUrl;
        const updatedRestaurant = await Restaurant_1.default.findByIdAndUpdate(restaurantId, { $set: updateData }, { new: true, runValidators: true });
        if (!updatedRestaurant)
            throw new Error('Restaurant not found');
        return updatedRestaurant;
    }
    // DELETE Restaurant (Cascades and deletes all associated products)
    static async deleteRestaurant(restaurantId) {
        const restaurant = await Restaurant_1.default.findByIdAndDelete(restaurantId);
        if (!restaurant)
            throw new Error('Restaurant not found');
        const filter = { restaurantId: restaurantId };
        // Clean up associated products & clear user reference
        await Product_1.default.deleteMany(filter);
        await User_1.default.updateMany(filter, { $unset: { restaurantId: '' } });
        return { message: 'Restaurant and associated products deleted successfully' };
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map