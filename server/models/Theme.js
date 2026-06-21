const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  primaryColor: {
    type: String,
    default: '#000000' // Black
  },
  secondaryColor: {
    type: String,
    default: '#DC143C' // Red
  },
  backgroundColor: {
    type: String,
    default: '#1a1a1a'
  },
  textColor: {
    type: String,
    default: '#FFFFFF'
  },
  fontFamily: {
    type: String,
    default: 'Arial, sans-serif'
  },
  logoUrl: String,
  bannerUrl: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Theme', themeSchema);
