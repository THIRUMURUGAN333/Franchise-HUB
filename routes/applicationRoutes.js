const express = require('express');
const router = express.Router();
const Application = require('../Application');
const auth = require('../middleware/auth');

// Submit application
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, city, budget, franchise } = req.body;

    if (!name || !email || !phone || !city || !budget || !franchise) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const app = await Application.create({ name, email, phone, city, budget, franchise });

    // Try sending email but don't fail if it errors
    try {
      const nodemailer = require('nodemailer');
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS &&
          process.env.EMAIL_USER !== 'your_email@gmail.com') {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Franchise Application Received',
          html: `<h2>Hi ${name},</h2><p>Your application has been received. We'll contact you soon.</p>`,
        });
      }
    } catch (emailErr) {
      console.log('Email skipped:', emailErr.message);
    }

    res.status(201).json(app);
  } catch (err) {
    console.error('Application error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get all applications (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const apps = await Application.find()
      .populate('franchise', 'name')
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
