import mongoose from 'mongoose';
import Hotel from './models/Hotel.js';
import dotenv from 'dotenv';
dotenv.config();

const images = [
  'demo1.png',
  'demo2.png',
  'demo3.png',
  'demo4.png',
  'demo5.png',
  'demo6.png',
  'demo7.png',
  'demo8.png',
];

const hotels = images.map((img, i) => ({
  name: `Hotel ${String.fromCharCode(65 + i)}`,
  image: `/images/${img}`,
  description: `A comfortable stay at Hotel ${String.fromCharCode(65 + i)} with great amenities.`,
  price: 2000 + i * 500
}));

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Hotel.deleteMany({});
  await Hotel.insertMany(hotels);
  console.log('Seeded 8 hotels!');
  process.exit();
}
seed();
