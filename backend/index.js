import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';

dotenv.config();

const app = express();

// ✅ Enable Cross-Origin Resource Sharing
app.use(cors());

// ✅ Parse incoming JSON requests
app.use(express.json());

// ✅ Health Check Route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// ✅ Config
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Atlas URI
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://manojkumxr:<PASSWORD>@cluster0.jujeta7.mongodb.net/jobportal?retryWrites=true&w=majority';

// ✅ Start Server Function
async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start server', err);
    process.exit(1);
  }
}

start();
