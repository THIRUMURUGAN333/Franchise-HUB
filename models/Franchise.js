const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  investmentRange: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String },
  images: [String],
  roi: { type: String },
  requirements: [String],
  city: { type: String },
  popularity: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Franchise', franchiseSchema);
