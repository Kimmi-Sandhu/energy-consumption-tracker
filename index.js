const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
const energyRoutes = require('./routes/energyRoutes');
app.use('/api/energy', energyRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log('Server running on port 80');
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });