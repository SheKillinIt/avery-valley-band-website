const mongoose = require('mongoose');

const bandInfoSchema = new mongoose.Schema({
  bandName: {
    type: String,
    default: 'Avery Valley Band'
  },
  about: {
    type: String,
    default: ''
  },
  logo: {
    type: String,
    default: ''
  },
  gallery: [{
    url: String,
    caption: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  upcomingShows: [{
    title: String,
    date: Date,
    location: String,
    description: String
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BandInfo', bandInfoSchema);
