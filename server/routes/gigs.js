const express = require('express');
const authMiddleware = require('../middleware/auth');
const Gig = require('../models/Gig');

const router = express.Router();

// Get all gigs
router.get('/', async (req, res) => {
  try {
    const gigs = await Gig.find().sort({ date: 1 });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add gig (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const gig = new Gig(req.body);
    await gig.save();
    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update gig (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const gig = await Gig.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete gig (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Gig.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gig deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
