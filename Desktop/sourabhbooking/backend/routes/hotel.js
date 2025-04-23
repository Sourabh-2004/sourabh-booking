import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
