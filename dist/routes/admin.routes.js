"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
// Require JWT and Admin role for all admin routes
router.use(auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('admin'));
router.post('/restaurants', upload_1.upload.single('logo'), admin_controller_1.AdminController.createRestaurant);
router.put('/restaurants/:id', upload_1.upload.single('logo'), admin_controller_1.AdminController.updateRestaurant);
router.delete('/restaurants/:id', admin_controller_1.AdminController.deleteRestaurant);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map