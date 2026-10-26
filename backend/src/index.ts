import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import activityRoutes from './routes/activityRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-app';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Fitness App API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 