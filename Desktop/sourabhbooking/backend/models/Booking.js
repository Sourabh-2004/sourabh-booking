import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
  guests: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', BookingSchema);
