const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: 'User exists' });
  }
};

exports.login = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  const Model = isAdmin ? Admin : User;
  const user = await Model.findOne({ email });
  if (!user || !await user.comparePassword(password)) return res.status(401).json({ msg: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

// Admin CRUD in adminController.js, protected by middleware