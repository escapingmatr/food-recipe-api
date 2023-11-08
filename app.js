const express = require('express');
const app = express();
const recipeRoutes = require('./routes/recipes'); // Import recipe routes

app.use(express.json());

// Define routes and middleware here
app.use('/recipes', recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
