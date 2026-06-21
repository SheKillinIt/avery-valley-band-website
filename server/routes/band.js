const express = require('express');
const authMiddleware = require('../middleware/auth');
const BandInfo = require('../models/BandInfo');

const router = express.Router();

// Get band info
router.get('/', async (req, res) => {
  try {
    let bandInfo = await BandInfo.findOne();
    if (!bandInfo) {
      bandInfo = new BandInfo();
      await bandInfo.save();
    }
    res.json(bandInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update band info (admin only)
router.put('/', authMiddleware, async (req, res) => {
  try {
    let bandInfo = await BandInfo.findOne();
    if (!bandInfo) {
      bandInfo = new BandInfo();
    }

    Object.assign(bandInfo, req.body);
    bandInfo.updatedAt = new Date();
    await bandInfo.save();

    res.json(bandInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add upcoming show
router.post('/shows', authMiddleware, async (req, res) => {
  try {
    let bandInfo = await BandInfo.findOne();
    if (!bandInfo) {
      bandInfo = new BandInfo();
    }

    bandInfo.upcomingShows.push(req.body);
    await bandInfo.save();

    res.json(bandInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete upcoming show
router.delete('/shows/:showId', authMiddleware, async (req, res) => {
  try {
    const bandInfo = await BandInfo.findOneAndUpdate(
      {},
      { $pull: { upcomingShows: { _id: req.params.showId } } },
      { new: true }
    );

    res.json(bandInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
