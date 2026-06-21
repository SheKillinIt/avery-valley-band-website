import React, { useState } from 'react';
import axios from 'axios';
import './BookingForm.css';

function BookingForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    gigDate: '',
    venue: '',
    eventType: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/api/bookings', formData);
      setSubmitted(true);
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        gigDate: '',
        venue: '',
        eventType: '',
        message: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit booking');
    }
  };

  return (
    <main className="booking-page">
      <div className="booking-container">
        <h1>Book Avery Valley Band</h1>
        
        {submitted && (
          <div className="success-message">
            <h3>✅ Booking Request Submitted!</h3>
            <p>Thank you for your interest. We'll review your request and contact you soon.</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {!submitted && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="clientName"
              placeholder="Your Name"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="clientEmail"
              placeholder="Your Email"
              value={formData.clientEmail}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="clientPhone"
              placeholder="Your Phone"
              value={formData.clientPhone}
              onChange={handleChange}
              required
            />
            <input
              type="datetime-local"
              name="gigDate"
              value={formData.gigDate}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="venue"
              placeholder="Venue Name"
              value={formData.venue}
              onChange={handleChange}
            />
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
            >
              <option value="">Select Event Type</option>
              <option value="Wedding">Wedding</option>
              <option value="Corporate">Corporate Event</option>
              <option value="Birthday">Birthday Party</option>
              <option value="Festival">Festival</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              name="message"
              placeholder="Tell us about your event"
              rows="5"
              value={formData.message}
              onChange={handleChange}
            />
            <button type="submit" className="btn">Submit Booking Request</button>
          </form>
        )}
      </div>
    </main>
  );
}

export default BookingForm;
