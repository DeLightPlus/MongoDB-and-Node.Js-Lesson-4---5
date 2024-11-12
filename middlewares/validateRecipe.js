// middlewares/validateRecipe.js
const validateRecipe = (req, res, next) => {
    const { name, ingredients, instructions, cookingTime } = req.body;
    if (!name || !ingredients || !instructions || !cookingTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    next();  // Proceed to the next middleware or route handler
  };
  
  module.exports = validateRecipe;
  