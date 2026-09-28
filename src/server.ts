import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database';
import customerRoutes from './routes/routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Mount Customer API
app.use('/api/v1/customer', customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
// Embedded HMI: MQTT
