// Serves static images from the hotel-images folder
import express from 'express';
import path from 'path';

export default function serveImages(app) {
  app.use('/images', express.static(path.join('C:/Users/soura/Desktop/hotel-images')));
}
