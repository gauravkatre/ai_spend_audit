import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { rateLimit } from 'express-rate-limit';
import auditRoutes from './routes/audit.js';
import leadRoutes from './routes/leads.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};    
// For Testing I am adding this line
connectDB();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://ai-spend-audit-xi-green.vercel.app',
      'http://localhost:5173',
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use('/api', limiter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/audit', auditRoutes);
app.use('/api/leads', leadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;