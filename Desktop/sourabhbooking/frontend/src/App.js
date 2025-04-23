import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Hotels from './pages/Hotels';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import './App.css';

function App() {
  const [user, setUser] = useState(() => localStorage.getItem('token') ? localStorage.getItem('username') : null);

  useEffect(() => {
    // Listen for login/logout in other tabs
    const onStorage = () => setUser(localStorage.getItem('token') ? localStorage.getItem('username') : null);
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    window.location.href = '/hotels';
  };

  // Custom Login wrapper to update user and redirect
  function LoginWrapper() {
    const navigate = useNavigate();
    return <Login onLogin={() => {
      setUser(localStorage.getItem('username'));
      navigate('/hotels');
    }} />;
  }

  // Custom Register wrapper to redirect after registration
  function RegisterWrapper() {
    const navigate = useNavigate();
    return <Register onRegister={() => navigate('/login')} />;
  }

  return (
    <Router>
      <nav className="peak-navbar">
        <div className="peak-navbar-container">
          <Link className="peak-navbar-brand" to="/">Sourabh Booking</Link>
          <div className="peak-navbar-links">
            <Link className="peak-nav-link" to="/hotels">Hotels</Link>
            <Link className="peak-nav-link" to="/dashboard">Dashboard</Link>
            <Link className="peak-nav-link" to="/feedback">Feedback</Link>
            <Link className="peak-nav-link" to="/about">About</Link>
            <Link className="peak-nav-link" to="/contact">Contact</Link>
            {!user && <Link className="peak-nav-link" to="/register">Register</Link>}
            {!user && <Link className="peak-nav-link" to="/login">Login</Link>}
            {user && <span className="peak-nav-link peak-nav-user">{user}</span>}
            {user && <button className="peak-nav-link peak-nav-logout" onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterWrapper />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router>
  );
}


export default App;
