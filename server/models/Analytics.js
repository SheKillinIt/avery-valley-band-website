const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  pageViews: {
    type: Number,
    default: 0
  },
  uniqueVisitors: {
    type: Number,
    default: 0
  },
  bookingRequests: {
    type: Number,
    default: 0
  },
  merchSales: {
    type: Number,
    default: 0
  },
  totalRevenue: {
    type: Number,
    default: 0
  },
  dailyStats: [{
    date: Date,
    views: Number,
    visitors: Number
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
