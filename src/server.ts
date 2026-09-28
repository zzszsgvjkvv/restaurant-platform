import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database';
import customerRoutes from './routes/routes';
import publicRoutes from './routes/public.routes';
import authRoutes from './routes/auth.routes';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Mount Customer API
app.use('/api/v1/customer', customerRoutes);
// Public API Base Path
app.use('/api/v1/public', publicRoutes);
// Routes
app.use('/api/v1/auth', authRoutes);











export default app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
// Embedded HMI: MQTT
