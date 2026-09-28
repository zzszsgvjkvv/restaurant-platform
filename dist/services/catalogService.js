"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const Product_1 = __importDefault(require("../models/Product"));
class CatalogService {
    // Fetch active restaurants and branches
    static async getRestaurants() {
        return await Restaurant_1.default.find({ status: 'active' });
    }
    // Fetch products, optionally filtered by restaurant or branch
    static async getProducts(filter) {
        const query = { isAvailable: true };
        if (filter.restaurantId)
            query.restaurantId = filter.restaurantId;
        if (filter.category)
            query.category = filter.category;
        return await Product_1.default.find(query).populate('restaurantId', 'name logoUrl');
    }
}
exports.CatalogService = CatalogService;
//# sourceMappingURL=catalogService.js.map