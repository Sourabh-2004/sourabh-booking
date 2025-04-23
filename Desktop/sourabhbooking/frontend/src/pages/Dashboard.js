import React from 'react';
import DashboardHotels from '../components/DashboardHotels';
import UserBookings from '../components/UserBookings';

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <p className="dashboard-welcome">Welcome! Here you can view your bookings and submit feedback.</p>
      <UserBookings />
      <h4 className="dashboard-section-title mt-4">Available Hotels</h4>
      <DashboardHotels />
    </div>
  );
}
