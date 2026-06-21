const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  gigDate: {
    type: Date,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  clientEmail: {
    type: String,
    required: true
  },
  clientPhone: {
    type: String,
    required: true
  },
  venue: String,
  eventType: String,
  message: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'denied', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: Date,
  adminNotes: String
});

module.exports = mongoose.model('Booking', bookingSchema);
