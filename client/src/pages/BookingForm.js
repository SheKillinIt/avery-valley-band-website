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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post('/api/bookings', formData);
      setSuccess(true);
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        gigDate: '',
        venue: '',
        eventType: '',
        message: ''
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit booking request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="booking-page">
      <div className="booking-container">
        <h1>Book Avery Valley Band</h1>
        <p className="subtitle">Fill out the form below to request a booking</p>

        {success && <div className="success-message">✓ Booking request submitted! We'll contact you soon.</div>}
        {error && <div className="error-message">✗ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="clientName">Your Name *</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="clientEmail">Email *</label>
            <input
              type="email"
              id="clientEmail"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="clientPhone">Phone *</label>
            <input
              type="tel"
              id="clientPhone"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gigDate">Preferred Date *</label>
            <input
              type="datetime-local"
              id="gigDate"
              name="gigDate"
              value={formData.gigDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="venue">Venue/Location</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="e.g., The Grand Hall, Downtown Park"
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventType">Event Type</label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
            >
              <option value="">Select an event type</option>
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate Event</option>
              <option value="party">Party/Birthday</option>
              <option value="festival">Festival</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Additional Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your event..."
              rows="5"
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Booking Request'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default BookingForm;
