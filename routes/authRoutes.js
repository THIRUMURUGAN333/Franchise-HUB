const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../User');
const Admin = require('../Admin');

const sign = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ token: sign(user._id, user.role), user: { id: user._id, name, email, role: user.role } });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ token: sign(user._id, user.role), user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid admin credentials' });
    res.json({ token: sign(admin._id, 'admin'), user: { id: admin._id, email, role: 'admin' } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
