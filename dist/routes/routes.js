"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/controller");
const router = (0, express_1.Router)();
// Auth Endpoints 
router.post('/signup', controller_1.CustomerController.signup);
router.post('/login', controller_1.CustomerController.login);
// Discovery Endpoints
router.get('/restaurants', controller_1.CustomerController.getRestaurants);
router.post('/createrestaurants', controller_1.CustomerController.CreateRestaurants);
router.get('/products', controller_1.CustomerController.getProducts);
// router.post('/restaurants', upload.single('logo'), OwnerController.createRestaurant);
// router.put('/restaurants/:id', upload.single('logo'), OwnerController.updateRestaurant);
// router.post('/restaurants/:id/branches', OwnerController.createRestaurant); 
// Products
// router.post('/products', upload.single('image'), OwnerController.createProduct);
// router.put('/products/:id', upload.single('image'), OwnerController.updateProduct);
exports.default = router;
//# sourceMappingURL=routes.js.map