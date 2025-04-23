import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3005', 'http://localhost:4000', 'https://sourabh-booking.vercel.app'],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: '*',
  optionsSuccessStatus: 200
}));
app.options('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:3005', 'http://localhost:4000', 'https://sourabh-booking.vercel.app'],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: '*',
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(cookieParser());

// Serve images statically from Desktop/imubhai
import serveImages from './static.js';
serveImages(app);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sourabhbooking')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
import authRoutes from './routes/auth.js';
import hotelRoutes from './routes/hotel.js';
import bookingRoutes from './routes/booking.js';
import feedbackRoutes from './routes/feedback.js';
import statusRoutes from './routes/status.js';

app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/status', statusRoutes);

app.get('/', (req, res) => {
  res.send('Sourabh Booking App API');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
