// routes/recipeRoutes.js
const express = require('express');
const recipeController = require('../controllers/recipeController');
const router = express.Router();

// Define API routes and link them to the controller functions
router.post('/', recipeController.createRecipe);
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
