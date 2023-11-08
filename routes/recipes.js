const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your PostgreSQL database connection

// Create a new recipe
router.post('/', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, ingredients, instructions } = req.body;

    // Insert the new recipe into the database
    const newRecipe = await db.one(
      'INSERT INTO recipes (name, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *',
      [name, ingredients, instructions]
    );

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the recipe.' });
  }
});

// Define other routes for reading, updating, and deleting recipes

module.exports = router;
