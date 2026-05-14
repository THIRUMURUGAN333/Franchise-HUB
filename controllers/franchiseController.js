const Franchise = require('../models/Franchise');

exports.getAllFranchises = async (req, res) => {
  try {
    const { category, budget, city, sort } = req.query;
    let query = {};
    if (category) query.category = category;
    if (city) query.city = city;
    // Budget filter logic (parse range)
    if (budget) {
      // Assume budget is like 'under500k', implement parsing
    }

    let franchises = await Franchise.find(query);
    if (sort === 'popularity') franchises.sort((a, b) => b.popularity - a.popularity);
    if (sort === 'price') franchises.sort((a, b) => parseInt(a.investmentRange.split('-')[0]) - parseInt(b.investmentRange.split('-')[0]));

    res.json(franchises);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getFranchiseById = async (req, res) => {
  try {
    const franchise = await Franchise.findById(req.params.id);
    if (!franchise) return res.status(404).json({ msg: 'Not found' });
    res.json(franchise);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Add more for CRUD in adminController.js