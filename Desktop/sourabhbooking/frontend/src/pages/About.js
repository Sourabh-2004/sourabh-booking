import React from 'react';

export default function About() {
  return (
    <div className="container mt-4">
      <h2>About Sourabh Booking</h2>
      <p className="dashboard-hotel-desc" style={{fontSize:'1.15rem'}}>
        Welcome to <b>Sourabh Booking</b> – your gateway to unforgettable stays and luxury experiences. We connect you with top-rated hotels featuring world-class amenities, beautiful rooms, and exceptional service. Our platform makes booking easy, secure, and personalized for every guest.
      </p>
      <ul style={{fontSize:'1.08rem', marginTop:'1.3rem', marginBottom:'1.3rem'}}>
        <li>🌟 <b>Premium Hotels</b>: Handpicked properties with spa, pool, gourmet dining, and more.</li>
        <li>🛎️ <b>Easy Booking</b>: Fast, seamless, and mobile-friendly reservation process.</li>
        <li>🔒 <b>Safe & Secure</b>: Your data and payments are protected with top security standards.</li>
        <li>💬 <b>Feedback Welcome</b>: We value your suggestions to make your experience even better.</li>
      </ul>
      <div style={{fontWeight:600, color:'#3358e6'}}>Book your next stay with confidence and discover the best hotels with Sourabh Booking!</div>
    </div>
  );
}
