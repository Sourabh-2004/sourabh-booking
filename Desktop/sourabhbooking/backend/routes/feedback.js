import express from 'express';
import Feedback from '../models/Feedback.js';
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

// Submit feedback
router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const feedback = new Feedback({ user: req.user.id, message });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all feedback (admin only - for demo, allow all)
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'username');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
