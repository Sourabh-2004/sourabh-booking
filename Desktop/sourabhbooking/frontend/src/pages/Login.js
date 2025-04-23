import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      console.log('LOGIN RESPONSE:', data, res);
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        setMessage('Login successful!');
        if (onLogin) onLogin();
      } else setMessage(data.error || data.message || JSON.stringify(data) || 'Login failed: ' + JSON.stringify(data));
    } catch {
      setMessage('Login failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form className="peak-form" onSubmit={handleSubmit}>
        <input className="form-control mb-3" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="form-control mb-3" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button className="btn btn-primary w-100" type="submit">Login</button>
      </form>
      {message && <div className={message.includes('success') ? 'booking-success' : 'booking-error'}>{message}</div>}
    </div>
  );
}
