import Types from 'mongoose';
import Restaurant, { IRestaurant } from '../models/Restaurant';
import Product from '../models/Product';
import User from '../models/User';

export class AdminService {
    // CREATE Restaurant (Admin Only)
    static async createRestaurant(data: Partial<IRestaurant>, logoUrl?: string) {
        const restaurant = new Restaurant({
            ...data,
            logoUrl: logoUrl || data.logoUrl,
        });

        await restaurant.save();

        // If an ownerId was assigned during creation, link the restaurant to the User model
        if (data.ownerId) {
            await User.findByIdAndUpdate(data.ownerId, { restaurantId: restaurant._id });
        }

        return restaurant;
    }

    // UPDATE Restaurant
    static async updateRestaurant(restaurantId: string, updateData: Partial<IRestaurant>, logoUrl?: string) {
        if (logoUrl) updateData.logoUrl = logoUrl;

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            restaurantId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedRestaurant) throw new Error('Restaurant not found');
        return updatedRestaurant;
    }

    // DELETE Restaurant (Cascades and deletes all associated products)
    static async deleteRestaurant(restaurantId: Types.Types.ObjectId | string) {
        const restaurant = await Restaurant.findByIdAndDelete(restaurantId);
        if (!restaurant) throw new Error('Restaurant not found');

        const filter = { restaurantId: restaurantId as any };

        // Clean up associated products & clear user reference
        await Product.deleteMany(filter as any);
        await User.updateMany(filter as any, { $unset: { restaurantId: '' } });

        return { message: 'Restaurant and associated products deleted successfully' };
    }
}