// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try 
  {
    // 
    const connection = await mongoose.connect('mongodb://localhost:27017/recipeApp', 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } 
  catch (err) 
  {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); // Exit the app with failure
  }
};

module.exports = connectDB;
