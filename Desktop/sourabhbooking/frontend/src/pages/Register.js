import React, { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else setMessage(data.error || data.message || JSON.stringify(data) || 'Registration failed');
    } catch {
      setMessage('Registration failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form className="peak-form" onSubmit={handleSubmit}>
        <input className="form-control mb-3" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input className="form-control mb-3" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="form-control mb-3" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button className="btn btn-primary w-100" type="submit">Register</button>
      </form>
      {message && <div className={message.includes('success') ? 'booking-success' : 'booking-error'} style={{whiteSpace: 'pre-wrap'}}>{typeof message === 'string' ? message : JSON.stringify(message, null, 2)}</div>}
    </div>
  );
}
