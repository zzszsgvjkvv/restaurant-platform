"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const public_routes_1 = __importDefault(require("./routes/public.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, database_1.connectDB)();
app.use('/api/v1/public', public_routes_1.default); // Customer read-only
app.use('/api/v1/auth', auth_routes_1.default); // Register / Login / Profile
app.use('/api/v1/admin', admin_routes_1.default); // Admin restaurant management
app.use('/api/v1/products', product_routes_1.default);
exports.default = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
// Embedded HMI: MQTT
/*import express from 'express';
import publicRoutes from './routes/public.routes';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import productRoutes from './routes/product.routes';

const app = express();

app.use(express.json());

// API Base Routes
app.use('/api/v1/public', publicRoutes);     // Customer read-only
app.use('/api/v1/auth', authRoutes);         // Register / Login / Profile
app.use('/api/v1/admin', adminRoutes);       // Admin restaurant management
app.use('/api/v1/products', productRoutes);  // Product CRUD operations

export default app; */ 
//# sourceMappingURL=server.js.map