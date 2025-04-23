import express from 'express';
import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecret';

function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Book hotel
router.post('/', auth, async (req, res) => {
  try {
    const { hotelId, checkin, checkout, guests } = req.body;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    const booking = new Booking({
      user: req.user.id,
      hotel: hotelId,
      checkin,
      checkout,
      guests
    });
    await booking.save();
    res.status(201).json({ message: 'Booked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('hotel');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
