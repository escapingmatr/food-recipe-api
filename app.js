// app.js
const express = require('express');
const app = express();
const path = require('path');
const recipeRoutes = require('./routes/recipes'); // Import your recipe routes
const db = require('./db');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files (your front-end files)
app.use(express.static(path.join(__dirname, 'public')));

// Define routes and middleware here
app.use('/recipes', recipeRoutes);

// Example route to retrieve recipes
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await db.any('SELECT * FROM recipes');
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching recipes.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
