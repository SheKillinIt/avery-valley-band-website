const express = require('express');
const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

const router = express.Router();

// Create booking request
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Send email to admin
    await sendAdminNotification(booking);

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get booking status
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to send admin notification
const sendAdminNotification = async (booking) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const emailBody = `
New Booking Request!

Client: ${booking.clientName}
Email: ${booking.clientEmail}
Phone: ${booking.clientPhone}
Requested Date: ${booking.gigDate}
Venue: ${booking.venue || 'Not specified'}
Event Type: ${booking.eventType || 'Not specified'}
Message: ${booking.message || 'No message'}

Log in to your dashboard to approve or deny this booking.
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Booking Request from ${booking.clientName}`,
      text: emailBody
    });
  } catch (error) {
    console.log('Email error:', error.message);
  }
};

module.exports = router;
