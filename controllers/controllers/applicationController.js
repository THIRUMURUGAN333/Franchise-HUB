const Application = require('../models/Application');
const sendEmail = require('../utils/email');

exports.submitApplication = async (req, res) => {
  try {
    const app = new Application(req.body);
    await app.save();
    // Send email to admin
    await sendEmail(process.env.ADMIN_EMAIL, 'New Application', `New app from ${req.body.name} for ${req.body.franchise}`);
    res.status(201).json({ msg: 'Application submitted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
