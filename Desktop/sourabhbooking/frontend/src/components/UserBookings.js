import React, { useEffect, useState } from 'react';
import '../HotelBooking.css';

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelStatus, setCancelStatus] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const API = process.env.REACT_APP_API_URL;
      const res = await fetch(`${API}/api/bookings`, {
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      if (res.ok) {
        setBookings(data);
      } else {
        setError(data.message || 'Failed to load bookings');
      }
    } catch {
      setError('Failed to load bookings');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    setCancelStatus('');
    try {
      const token = localStorage.getItem('token');
      const API = process.env.REACT_APP_API_URL;
      const res = await fetch(`${API}/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      });
      const data = await res.json();
      if (res.ok) {
        setCancelStatus('Booking cancelled');
        setBookings(bookings.filter(b => b._id !== bookingId));
      } else {
        setCancelStatus(data.message || 'Failed to cancel booking');
      }
    } catch {
      setCancelStatus('Failed to cancel booking');
    }
  };

  if (loading) return <div>Loading your bookings...</div>;
  if (error) return <div className="booking-error">{error}</div>;

  return (
    <div className="user-bookings-list mt-4">
      <h4 className="dashboard-section-title">Your Booked Hotels</h4>
      {cancelStatus && <div className={cancelStatus.includes('cancelled') ? 'booking-success' : 'booking-error'}>{cancelStatus}</div>}
      {bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        <div className="row">
          {bookings.map((booking, i) => (
            <div className="col-md-6 mb-3" key={booking._id}>
              <div className="card dashboard-hotel-card">
                <div className="card-body">
                  <h5 className="card-title dashboard-hotel-title">{booking.hotel?.name || 'Hotel'}</h5>
                  <div className="dashboard-hotel-desc">{booking.hotel?.description}</div>
                  <div><strong>Check-in:</strong> {booking.checkin}</div>
                  <div><strong>Check-out:</strong> {booking.checkout}</div>
                  <div><strong>Guests:</strong> {booking.guests}</div>
                  <span className="dashboard-hotel-price">₹{booking.hotel?.price || '-'}</span>
                  <button className="peak-nav-logout mt-2" style={{float:'right',fontSize:'0.95rem'}} onClick={() => handleCancel(booking._id)}>
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
