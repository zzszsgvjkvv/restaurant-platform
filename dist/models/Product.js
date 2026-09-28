"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    restaurantId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, index: true },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Product', productSchema);
//# sourceMappingURL=Product.js.map