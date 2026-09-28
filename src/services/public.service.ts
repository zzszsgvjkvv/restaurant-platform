import Restaurant from '../models/Restaurant';
import Product from '../models/Product';

export class PublicService {
  // Get all active restaurants
  static async getActiveRestaurants() {
    return await Restaurant.find({ isActive: true }).select('-__v');
  }

  // Get single restaurant by ID with its products
  static async getRestaurantWithMenu(restaurantId: string) {
    const restaurant = await Restaurant.findOne({ _id: restaurantId, isActive: true });
    if (!restaurant) throw new Error('Restaurant not found or inactive');

    const products = await Product.find({_id: restaurantId, isAvailable: true }).select('-__v');
    return { restaurant, products };
  }

  // Get products with optional search and category filters across restaurants
  static async getProducts(query: { category?: string; search?: string; restaurantId?: string }) {
    const filter: any = { isAvailable: true };

    if (query.restaurantId) filter.restaurantId = query.restaurantId;
    if (query.category) filter.category = query.category;
    if (query.search) filter.name = { $regex: query.search, $options: 'i' };

    return await Product.find(filter).populate('restaurantId', 'name logoUrl').select('-__v');
  }

  // Get single product details
  static async getProductById(productId: string) {
    const product = await Product.findById(productId).populate('restaurantId', 'name logoUrl');
    if (!product || !product.isAvailable) throw new Error('Product not found');
    return product;
  }
}