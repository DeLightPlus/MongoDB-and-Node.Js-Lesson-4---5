// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  cookingTime: { type: Number, required: true }, // in minutes
  createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema); //Recipe => DatabaseName?!

module.exports = Recipe;
