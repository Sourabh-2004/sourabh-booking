import React, { useState } from 'react';
import '../HotelBooking.css';

export default function BookingForm({ hotelId }) {
  const [show, setShow] = useState(false);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(1);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const token = localStorage.getItem('token');
      const API = process.env.REACT_APP_API_URL;
      const res = await fetch(`${API}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ hotelId, checkin, checkout, guests })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Booked successfully!');
        setShow(false);
      } else {
        setStatus(data.message || 'Booking failed');
      }
    } catch {
      setStatus('Booking failed');
    }
    setLoading(false);
  };

  return (
    <div>
      <button className="btn btn-primary btn-sm" onClick={() => setShow(!show)}>{show ? 'Cancel' : 'Book'}</button>
      {show && (
        <form className="booking-form mt-2" onSubmit={handleSubmit}>
          <label>Check-in: <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} required /></label><br />
          <label>Check-out: <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} required /></label><br />
          <label>Guests: <input type="number" min="1" value={guests} onChange={e => setGuests(e.target.value)} required /></label><br />
          <button className="btn btn-success" type="submit" disabled={loading}>{loading ? 'Booking...' : 'Confirm Booking'}</button>
        </form>
      )}
      {status && <div className={status.includes('success') ? 'booking-success' : 'booking-error'}>{status}</div>}
    </div>
  );
}
