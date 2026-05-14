const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Food', 'Retail', 'Education', 'Services'], required: true },
  investmentRange: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String },
  images: [String], // Array of image URLs
  roi: { type: String },
  requirements: [String],
  city: { type: String },
  popularity: { type: Number, default: 0 },
});

module.exports = mongoose.model('Franchise', franchiseSchema);