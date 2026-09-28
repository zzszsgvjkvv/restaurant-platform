import Restaurant from '../models/Restaurant';
import Product from '../models/Product';

export class CatalogService {
  // Fetch active restaurants and branches
  static async getRestaurants() {
    return await Restaurant.find({ status: 'active' });
  }

  // Fetch products, optionally filtered by restaurant or branch
  static async getProducts(filter: { restaurantId?: string; category?: string }) {
    const query: any = { isAvailable: true };
    if (filter.restaurantId) query.restaurantId = filter.restaurantId;
    if (filter.category) query.category = filter.category;

    return await Product.find(query).populate('restaurantId', 'name logoUrl');
  }
}