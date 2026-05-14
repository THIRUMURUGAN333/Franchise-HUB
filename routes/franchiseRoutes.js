const express = require('express');
const router = express.Router();
const Franchise = require('../models/Franchise');
const auth = require('../middleware/auth');

// Get all franchises
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    const franchises = await Franchise.find(query).sort({ popularity: -1 });
    res.json(franchises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single franchise
router.get('/:id', async (req, res) => {
  try {
    const franchise = await Franchise.findById(req.params.id);
    if (!franchise) return res.status(404).json({ message: 'Not found' });
    res.json(franchise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create franchise (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const franchise = await Franchise.create(req.body);
    res.status(201).json(franchise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update franchise (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const franchise = await Franchise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(franchise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete franchise (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Franchise.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
