import Restaurant, { IRestaurant, IBranch } from '../models/Restaurant';
import Product, { IProduct } from '../models/Product';

export class OwnerService {
  // 1. Create Restaurant
  static async createRestaurant(data: Partial<IRestaurant>, logoUrl?: string) {
    const restaurant = new Restaurant({
      ...data,
      logoUrl: logoUrl || data.logoUrl
    });
    return await restaurant.save();
  }

  // 2. Add Branch to Restaurant
  static async addBranch(restaurantId: string, branchData: IBranch) {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new Error('Restaurant not found');

    restaurant.branches.push(branchData);
    await restaurant.save();
    return restaurant;
  }

  // 3. Create Product
  static async createProduct(productData: Partial<IProduct>, imageUrl?: string) {
    const product = new Product({
      ...productData,
      imageUrl: imageUrl || productData.imageUrl
    });
    return await product.save();
  }

  // 4. Update Restaurant (Flexible partial update)
  static async updateRestaurant(restaurantId: string, updateData: Partial<IRestaurant>, logoUrl?: string) {
    if (logoUrl) updateData.logoUrl = logoUrl;

    const updated = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updated) throw new Error('Restaurant not found');
    return updated;
  }

  // 5. Update Product (Flexible partial update)
  static async updateProduct(productId: string, updateData: Partial<IProduct>, imageUrl?: string) {
    if (imageUrl) updateData.imageUrl = imageUrl;

    const updated = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updated) throw new Error('Product not found');
    return updated;
  }
}