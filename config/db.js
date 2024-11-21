// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.MONGO_URL; // replace with your database URL

const connectDB = async () => {
  try 
  {
    // 
    const connection = await mongoose.connect(dbUrl)

    console.log(`MongoDB connected: ${connection.connection.host}`);    
  } 
  catch (err) 
  {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); // Exit the app with failure
  }
};

module.exports = connectDB;
