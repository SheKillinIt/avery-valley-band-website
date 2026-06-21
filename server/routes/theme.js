const express = require('express');
const authMiddleware = require('../middleware/auth');
const Theme = require('../models/Theme');

const router = express.Router();

// Get theme
router.get('/', async (req, res) => {
  try {
    let theme = await Theme.findOne();
    if (!theme) {
      theme = new Theme();
      await theme.save();
    }
    res.json(theme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update theme (admin only)
router.put('/', authMiddleware, async (req, res) => {
  try {
    let theme = await Theme.findOne();
    if (!theme) {
      theme = new Theme();
    }

    Object.assign(theme, req.body);
    theme.updatedAt = new Date();
    await theme.save();

    res.json(theme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
