import React, { useEffect, useState } from 'react';
import '../HotelBooking.css';
import BookingForm from './BookingForm';

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/hotels')
      .then(res => res.json())
      .then(data => { setHotels(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = hotels.filter(h => h.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="container mt-4">
      <h2>Hotels</h2>
      <input className="form-control mb-3" placeholder="Search hotels..." value={filter} onChange={e => setFilter(e.target.value)} />
      {loading ? <div>Loading...</div> : (
        <div className="row hotels-grid">
          {filtered.map((hotel, idx) => (
            <div key={hotel._id}>
              <div className="card h-100 dashboard-hotel-card">
                <img 
                  src={hotel.image && hotel.image.length > 5 
                    ? (hotel.image.startsWith('http') ? hotel.image : `http://localhost:8000${hotel.image}`)
                    : `/hotel-images/demo${(idx % 8) + 1}.jpg`}
                  onError={e => {
                    const pngPath = `/hotel-images/demo${(idx % 8) + 1}.png`;
                    if (!e.target.src.endsWith('.png')) e.target.src = pngPath;
                  }}
                  className="card-img-top dashboard-hotel-img" 
                  alt={hotel.name || 'Hotel'} 
                />
                <div className="card-body">
                  <h5 className="card-title dashboard-hotel-title">{hotel.name && hotel.name !== 'Demo Hotel' ? hotel.name : 'Royal Palace Resort'}</h5>
                  <p className="card-text dashboard-hotel-desc">{hotel.description && !hotel.description.includes('demo') ? hotel.description : 'A luxury hotel with world-class amenities, spa, pool, and gourmet dining. Experience comfort and elegance in the heart of the city.'}</p>
                  <span className="dashboard-hotel-price">₹{hotel.price}</span>
                  <BookingForm hotelId={hotel._id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
