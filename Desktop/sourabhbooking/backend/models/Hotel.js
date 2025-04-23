import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true }
});

export default mongoose.model('Hotel', HotelSchema);
