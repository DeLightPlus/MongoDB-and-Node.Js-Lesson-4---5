// index.js
const express = require('express');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipeRoutes');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());  // Parse JSON request bodies

// Connect to MongoDB
connectDB();

// Routes
app.use('/recipes', recipeRoutes);

// Error Handling Middleware (generic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 8027;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
