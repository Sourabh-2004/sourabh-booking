import React, { useState } from 'react';

export default function Feedback() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [type, setType] = useState('Suggestion');

  const handleSubmit = async e => {
    e.preventDefault();
    setResponse('');
    const token = localStorage.getItem('token');
    if (!token) return setResponse('Please login first.');
    try {
      const res = await fetch('http://localhost:8000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ message, rating, name, type })
      });
      const data = await res.json();
      if (res.ok) setResponse('Feedback submitted!');
      else setResponse(data.message || 'Failed to submit feedback.');
      setMessage('');
      setRating(5);
      setName('');
      setType('Suggestion');
    } catch {
      setResponse('Failed to submit feedback.');
    }
  };

  return (
    <div className="feedback-bg">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="feedback-card shadow-lg p-4 rounded-4" style={{maxWidth: 440, width: '100%', background:'#fff'}}> 
          <h2 className="feedback-title mb-4 text-center">Share Your Feedback</h2>
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-floating mb-3">
              <select id="type" className="form-select" value={type} onChange={e => setType(e.target.value)} aria-label="Feedback Type">
                <option>Suggestion</option>
                <option>Complaint</option>
                <option>Praise</option>
                <option>Other</option>
              </select>
              <label htmlFor="type">Feedback Type</label>
            </div>
            <div className="form-floating mb-3">
              <input id="name" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name (optional)" aria-label="Your Name (optional)" />
              <label htmlFor="name">Your Name (optional)</label>
            </div>
            <div className="mb-3">
              <label className="form-label d-block mb-1">Rating</label>
              <div className="star-rating" aria-label="Rating">
                {[1,2,3,4,5].map(star => (
                  <span 
                    key={star} 
                    className={"star " + (star <= rating ? "filled" : "")}
                    onClick={() => setRating(star)}
                    role="button"
                    tabIndex={0}
                    aria-label={star + " star"}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setRating(star)}
                  >&#9733;</span>
                ))}
              </div>
            </div>
            <div className="form-floating mb-3">
              <textarea id="feedback" className="form-control" placeholder="Your feedback..." value={message} onChange={e => setMessage(e.target.value)} required rows={3} aria-label="Your Feedback" style={{minHeight:80}}/>
              <label htmlFor="feedback">Your Feedback</label>
            </div>
            <button className="btn btn-gradient w-100 py-2" type="submit" aria-label="Submit Feedback">
              <span role="img" aria-label="Send">🚀</span> Submit
            </button>
            {response && (
              <div className={"mt-4 feedback-response " + (response.includes('submitted') ? 'text-success' : 'text-danger')}>
                {response.includes('submitted') ? '✅ ' : '❌ '}{response}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
