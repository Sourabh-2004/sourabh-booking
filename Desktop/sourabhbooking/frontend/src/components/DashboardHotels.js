import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/hotels')
      .then(res => {
        setHotels(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading hotels...</div>;

  return (
    <div className="dashboard-hotels-bg row mt-4">
      {hotels.map(hotel => (
        <div className="col-md-6 mb-4" key={hotel._id}>
          <div className="card h-100 dashboard-hotel-card">
            {hotel.image && !hotel.image.includes('image:/demo') && (
              <img 
                src={hotel.image.startsWith('http') ? hotel.image : `http://localhost:8000${hotel.image}`} 
                className="card-img-top dashboard-hotel-img" 
                alt={hotel.name}
              />
            )}
            <div className="card-body">
              <h5 className="card-title dashboard-hotel-title">{hotel.name && hotel.name !== 'Demo Hotel' ? hotel.name : 'Royal Palace Resort'}</h5>
              <p className="card-text dashboard-hotel-desc">{hotel.description && !hotel.description.includes('demo') ? hotel.description : 'A luxury hotel with world-class amenities, spa, pool, and gourmet dining. Experience comfort and elegance in the heart of the city.'}</p>
              <span className="dashboard-hotel-price">₹{hotel.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
