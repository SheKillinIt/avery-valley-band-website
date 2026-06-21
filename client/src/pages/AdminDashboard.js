import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const { auth } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
      fetchBookings();
    }
  }, [auth]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = async (id, notes) => {
    try {
      await axios.put(`/api/admin/bookings/${id}/confirm`, { adminNotes: notes });
      fetchBookings();
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  const denyBooking = async (id, notes) => {
    try {
      await axios.put(`/api/admin/bookings/${id}/deny`, { adminNotes: notes });
      fetchBookings();
    } catch (error) {
      console.error('Error denying booking:', error);
    }
  };

  return (
    <main className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {activeTab === 'bookings' && (
        <section className="bookings-section">
          <h2>Booking Requests</h2>
          {loading ? (
            <p>Loading...</p>
          ) : bookings.length > 0 ? (
            <div className="bookings-list">
              {bookings.map(booking => (
                <div key={booking._id} className={`booking-card status-${booking.status}`}>
                  <h3>{booking.clientName}</h3>
                  <p><strong>Email:</strong> {booking.clientEmail}</p>
                  <p><strong>Phone:</strong> {booking.clientPhone}</p>
                  <p><strong>Date:</strong> {new Date(booking.gigDate).toLocaleDateString()}</p>
                  <p><strong>Venue:</strong> {booking.venue}</p>
                  <p><strong>Event Type:</strong> {booking.eventType}</p>
                  <p><strong>Message:</strong> {booking.message}</p>
                  <p><strong>Status:</strong> <span className={`status-badge ${booking.status}`}>{booking.status}</span></p>

                  {booking.status === 'pending' && (
                    <div className="booking-actions">
                      <button
                        className="btn btn-confirm"
                        onClick={() => confirmBooking(booking._id, 'Booking confirmed!')}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-deny"
                        onClick={() => denyBooking(booking._id, 'Unfortunately, the date is not available.')}
                      >
                        Deny
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No bookings yet.</p>
          )}
        </section>
      )}

      {activeTab === 'settings' && (
        <section className="settings-section">
          <h2>Settings</h2>
          <p>Band information and customization options coming soon...</p>
        </section>
      )}
    </main>
  );
}

export default AdminDashboard;
