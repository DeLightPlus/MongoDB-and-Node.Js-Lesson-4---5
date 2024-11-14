// controllers/recipeController.js
const Recipe = require('../models/Recipe'); //the schema

// Create a new recipe
// exports.createRecipe = async (req, res) => 
// {
//   try 
//   {
//     const recipe = new Recipe(req.body);
//     await recipe.save();
//     res.status(201).json(recipe);
//   } 
//   catch (err) 
//   {
//     res.status(500).json({ message: 'Error creating recipe', error: err.message });
//   }
// };

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try 
  {
    // Use Recipe.create to both create and save the recipe in one step
    const recipe = await Recipe.create(req.body); // Create and save in one step
    res.status(201).json(recipe); // Respond with the created recipe
  } 
  catch (err) 
  {
    res.status(500).json({ message: 'Error creating recipe', error: err.message });
  }
};

// Get all recipes with pagination
exports.getAllRecipes = async (req, res) => 
{
  const { page = 1, size = 10 } = req.query;
  const skip = (page - 1) * size;

  try 
  {
    const recipes = await Recipe.find()
      .skip(skip)
      .limit(Number(size));
      
    const totalRecipes = await Recipe.countDocuments();
    res.json({ recipes, totalRecipes, page, totalPages: Math.ceil(totalRecipes / size) });
  } 
  catch (err) 
  {
    res.status(500).json({ message: 'Error fetching recipes', error: err.message });
  }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => 
{
  try 
  {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) 
    {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } 
  catch (err) 
  {
    res.status(500).json({ message: 'Error fetching recipe', error: err.message });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => 
{
  try 
  {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) 
    {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(updatedRecipe);
  } 
  catch (err) 
  {
    res.status(500).json({ message: 'Error updating recipe', error: err.message });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => 
{
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting recipe', error: err.message });
  }
};
 