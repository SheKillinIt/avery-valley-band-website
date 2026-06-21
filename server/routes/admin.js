const express = require('express');
const authMiddleware = require('../middleware/auth');
const Booking = require('../models/Booking');
const Analytics = require('../models/Analytics');
const nodemailer = require('nodemailer');

const router = express.Router();

// Get all bookings
router.get('/bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Confirm booking
router.put('/bookings/:id/confirm', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed', respondedAt: new Date(), adminNotes: req.body.adminNotes },
      { new: true }
    );

    // Send confirmation email to client
    await sendEmail(booking.clientEmail, 'Booking Confirmed', `Your booking for ${booking.gigDate} has been confirmed!`);

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deny booking
router.put('/bookings/:id/deny', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'denied', respondedAt: new Date(), adminNotes: req.body.adminNotes },
      { new: true }
    );

    // Send denial email to client
    await sendEmail(booking.clientEmail, 'Booking Response', `Unfortunately, the requested date is not available. ${req.body.adminNotes || ''}`);

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get analytics
router.get('/analytics', authMiddleware, async (req, res) => {
  try {
    let analytics = await Analytics.findOne();
    if (!analytics) {
      analytics = new Analytics();
      await analytics.save();
    }
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to send emails
const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });
  } catch (error) {
    console.log('Email error:', error.message);
  }
};

module.exports = router;
