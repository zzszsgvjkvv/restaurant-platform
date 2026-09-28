"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const public_controller_1 = require("../controllers/public.controller");
const router = (0, express_1.Router)();
// Fully public endpoints (No authentication needed)
router.get('/restaurants', public_controller_1.PublicController.getRestaurants);
router.get('/restaurants/:id', public_controller_1.PublicController.getRestaurantMenu);
router.get('/products', public_controller_1.PublicController.getProducts);
router.get('/products/:id', public_controller_1.PublicController.getProductById);
exports.default = router;
//# sourceMappingURL=public.routes.js.map