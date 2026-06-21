const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  location: String,
  venue: String,
  notes: String,
  isBooked: {
    type: Boolean,
    default: false
  },
  bookedBy: {
    name: String,
    email: String,
    phone: String,
    message: String
  },
  status: {
    type: String,
    enum: ['open', 'booked', 'pending', 'confirmed', 'cancelled'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gig', gigSchema);
