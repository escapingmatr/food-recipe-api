// recipeController.js
const db = require('../db');

// Create a new recipe
async function createRecipe(req, res) {
  try {
    // Extract data from the request body
    const { id, name, description, image_path, ingredients, instructions } =
      req.body;

    // Insert the new recipe into the database
    const newRecipe = await db.one(
      'INSERT INTO recipes (id, name, description, image_path) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, name, description, image_path]
    );

    // Insert ingredients into the database
    for (const ingredient of ingredients) {
      await db.none(
        'INSERT INTO ingredients (recipe_id, name, quantity) VALUES ($1, $2, $3)',
        [newRecipe.id, ingredient.name, ingredient.quantity]
      );
    }

    // Insert instructions into the database
    for (const instruction of instructions) {
      await db.none(
        'INSERT INTO instructions (recipe_id, step_order, description) VALUES ($1, $2, $3)',
        [newRecipe.id, instruction.step_order, instruction.description]
      );
    }

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the recipe.' });
  }
}

// Retrieve a single recipe by ID
async function getRecipeById(req, res) {
  try {
    const { recipeId } = req.params;

    // Fetch a single recipe by ID from the database
    const recipe = await db.one(
      'SELECT * FROM recipes WHERE id = $1',
      recipeId
    );

    res.json(recipe);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the recipe.' });
  }
}

// Get ingredients for a recipe
async function getIngredientsForRecipe(req, res) {
  const { recipeId } = req.params;
  try {
    const ingredients = await db.any(
      'SELECT * FROM ingredients WHERE recipe_id = $1',
      recipeId
    );
    res.json(ingredients);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching ingredients.' });
  }
}

// Get instructions for a recipe
async function getInstructionsForRecipe(req, res) {
  const { recipeId } = req.params;
  try {
    const instructions = await db.any(
      'SELECT * FROM instructions WHERE recipe_id = $1',
      recipeId
    );
    res.json(instructions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching instructions.' });
  }
}

async function deleteRecipe(req, res) {
  const { recipeId } = req.params;
  try {
    // Combine DELETE statements for ingredients and instructions
    await db.none('DELETE FROM ingredients WHERE recipe_id = $1', recipeId);
    await db.none('DELETE FROM instructions WHERE recipe_id = $1', recipeId);

    // Delete the recipe
    await db.none('DELETE FROM recipes WHERE id = $1', recipeId);

    res.json({ message: 'Recipe deleted successfully.' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the recipe.' });
  }
}

// Other controller functions for updating and deleting recipes can be added here

module.exports = {
  createRecipe,
  getRecipeById,
  getIngredientsForRecipe,
  getInstructionsForRecipe,
  deleteRecipe,
  // Add other exported functions as needed
};
