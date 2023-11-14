const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your PostgreSQL database connection

// Create a new recipe
router.post('/', async (req, res) => {
  try {
    // Extract data from the request body
    const { id, name, description, ingredients, instructions, pictures } =
      req.body;

    // Insert the new recipe into the database
    const newRecipe = await db.one(
      'INSERT INTO recipes (id, name, description, ingredients, instructions, pictures) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, name, description, ingredients, instructions, pictures]
    );

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the recipe.' });
  }
});

// Retrieve a single recipe by ID
router.get('/:recipeId', async (req, res) => {
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
});

// Get ingredients for a recipe
router.get('/:recipeId/ingredients', async (req, res) => {
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
});

// Get instructions for a recipe
router.get('/:recipeId/instructions', async (req, res) => {
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
});

// Update a recipe by ID
router.put('/:recipeId', async (req, res) => {
  // Implement update logic here
});

// Delete a recipe by ID
router.delete('/:recipeId', async (req, res) => {
  // Implement delete logic here
});

// Define other routes for reading, updating, and deleting recipes

module.exports = router;
