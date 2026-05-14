const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/franchises', require('./routes/franchiseRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.get('/', (req, res) => res.json({ message: 'Franchise Platform API running' }));

mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000, family: 4 })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error('MongoDB connection error:', err.message));
