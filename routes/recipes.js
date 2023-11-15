// recipes.js
const express = require('express');
const router = express.Router();
const recipeController = require('./recipeController'); // Import your recipe controller

// Create a new recipe
router.post('/', recipeController.createRecipe);

// Retrieve a single recipe by ID
router.get('/:recipeId', recipeController.getRecipeById);

// Get ingredients for a recipe
router.get('/:recipeId/ingredients', recipeController.getIngredientsForRecipe);

// Get instructions for a recipe
router.get(
  '/:recipeId/instructions',
  recipeController.getInstructionsForRecipe
);

// Update a recipe by ID
router.put('/:recipeId' /* Add your updateRecipeById controller function */);

// Delete a recipe by ID
router.delete('/:recipeId', recipeController.deleteRecipe);

// Define other routes for reading, updating, and deleting recipes

module.exports = router;
