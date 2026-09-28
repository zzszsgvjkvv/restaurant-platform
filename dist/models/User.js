"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    restaurantId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Restaurant', default: null },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=User.js.map