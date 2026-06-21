const express = require('express');
const authMiddleware = require('../middleware/auth');
const Analytics = require('../models/Analytics');

const router = express.Router();

// Get analytics
router.get('/', authMiddleware, async (req, res) => {
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

// Update analytics (internal use)
router.put('/', authMiddleware, async (req, res) => {
  try {
    let analytics = await Analytics.findOne();
    if (!analytics) {
      analytics = new Analytics();
    }

    Object.assign(analytics, req.body);
    analytics.updatedAt = new Date();
    await analytics.save();

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
