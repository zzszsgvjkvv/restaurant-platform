"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
// Require JWT authentication for write operations
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('admin', 'user'), auth_middleware_1.requireRestaurantOwnership, upload_1.upload.single('image'), product_controller_1.ProductController.createProduct);
router.put('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('admin', 'user'), upload_1.upload.single('image'), product_controller_1.ProductController.updateProduct);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('admin', 'user'), product_controller_1.ProductController.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.routes.js.map