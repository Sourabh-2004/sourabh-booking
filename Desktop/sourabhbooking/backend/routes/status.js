import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ mongoConnected: mongoose.connection.readyState === 1 });
});

export default router;
