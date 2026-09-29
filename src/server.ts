import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database';
import publicRoutes from './routes/public.routes';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import productRoutes from './routes/product.routes';
import http from 'http';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();



app.use('/api/v1/public', publicRoutes);     // Customer read-only
app.use('/api/v1/auth', authRoutes);         // Register / Login / Profile
app.use('/api/v1/admin', adminRoutes);       // Admin restaurant management
app.use('/api/v1/products', productRoutes);






const server = http.createServer(app);

server.keepAliveTimeout = 120000; 
server.headersTimeout = 120500; 

export default app;
const PORT = process.env.PORT || 8000;
server.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is live and listening on port ${PORT}`);
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