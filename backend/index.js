

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import connectDB from './config/db.js';
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true,
}));
app.use(express.json());
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));