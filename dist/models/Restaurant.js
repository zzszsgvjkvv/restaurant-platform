"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    logoUrl: { type: String },
    cuisine: [{ type: String }],
    isActive: { type: Boolean, default: true },
    ownerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Restaurant', restaurantSchema);
//# sourceMappingURL=Restaurant.js.map