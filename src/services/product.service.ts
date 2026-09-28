import { Types } from 'mongoose';
import Product, { IProduct } from '../models/Product';
import Restaurant from '../models/Restaurant';

export class ProductService {
  // CREATE Product
  static async createProduct(restaurantId: string, data: Partial<IProduct>, imageUrl?: string) {
    // Validate restaurant existence
    const restaurantExists = await Restaurant.exists({ _id: restaurantId });
    if (!restaurantExists) throw new Error('Target restaurant does not exist');

    const product = new Product({
      ...data,
      restaurantId: new Types.ObjectId(restaurantId), // Cast string to Schema.Types.ObjectId
      imageUrl: imageUrl || data.imageUrl,
    });

    return await product.save();
  }

  // UPDATE Product
  static async updateProduct(productId: string, updateData: Partial<IProduct>, imageUrl?: string) {
    if (imageUrl) updateData.imageUrl = imageUrl;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) throw new Error('Product not found');
    return updatedProduct;
  }

  // DELETE Product
  static async deleteProduct(productId: string) {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) throw new Error('Product not found');

    return { message: 'Product deleted successfully' };
  }
}