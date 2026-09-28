"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const customer_service_1 = require("../services/customer_service");
require("multer");
class CustomerController {
    // POST /api/v1/customer/signup
    static async signup(req, res) {
        try {
            const { firstName, lastName, email, password, phone, location, address, paymentMethod } = req.body;
            const savedAddresses = address ? [{ address, location }] : [];
            const paymentMethods = paymentMethod ? [{ provider: paymentMethod }] : [];
            const result = await customer_service_1.AuthService.signup({
                firstName,
                lastName,
                email,
                password,
                phone,
                savedAddresses,
                paymentMethods
            });
            res.status(201).json({ success: true, ...result });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    // POST /api/v1/customer/login
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await customer_service_1.AuthService.login(email, password);
            res.status(200).json({ success: true, ...result });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    // GET /api/v1/customer/restaurants
    static async getRestaurants(req, res) {
        try {
            const restaurants = await customer_service_1.CatalogService.getRestaurants();
            res.status(200).json({ success: true, data: restaurants });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async CreateRestaurants(req, res) {
        try {
            const restaurants = await customer_service_1.CatalogService.CreateRestaurants();
            res.status(200).json({ success: true, data: restaurants });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    // GET /api/v1/customer/products
    static async getProducts(req, res) {
        try {
            const { restaurantId, category } = req.query;
            const products = await customer_service_1.CatalogService.getProducts({
                restaurantId: restaurantId,
                category: category
            });
            res.status(200).json({ success: true, data: products });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=controller.js.map