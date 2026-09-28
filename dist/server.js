"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const routes_1 = __importDefault(require("./routes/routes"));
const public_routes_1 = __importDefault(require("./routes/public.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, database_1.connectDB)();
// Mount Customer API
app.use('/api/v1/customer', routes_1.default);
// Public API Base Path
app.use('/api/v1/public', public_routes_1.default);
// Routes
app.use('/api/v1/auth', auth_routes_1.default);
exports.default = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
// Embedded HMI: MQTT
//# sourceMappingURL=server.js.map