import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

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
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="booking-page">
      <div className="booking-container">
        <h1>Book Avery Valley Band</h1>
        <p>Fill out the form below to request a booking</p>

        {submitted && (
          <div className="success-message">
            ✅ Booking request submitted! We'll contact you soon.
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

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
            placeholder="Tell us about your event..."
            value={formData.message}
            onChange={handleChange}
            rows="5"
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Booking Request'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default BookingForm;
