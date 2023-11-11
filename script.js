// Define the URL of your API endpoint to retrieve recipe data
const recipeApiUrl = '/api/recipes';

// Function to fetch and display recipes
async function displayRecipes() {
  try {
    const response = await fetch(recipeApiUrl);
    const recipes = await response.json();
    const recipeList = document.querySelector('.recipe-list');

    recipes.forEach((recipe, index) => {
      const recipeBox = document.createElement('div');
      recipeBox.className = 'recipe-box';
      recipeBox.textContent = recipe.name;

      // Add click event to navigate to the recipe detail page
      recipeBox.addEventListener('click', () => {
        window.location.href = `recipe.html?id=${recipe.id}`;
      });

      recipeList.appendChild(recipeBox);
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

// Function to display the recipe details on the recipe.html page
async function displayRecipeDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');

  if (recipeId) {
    // Fetch and display detailed recipe information
    try {
      const response = await fetch(`/api/recipes/${recipeId}`);
      const recipe = await response.json();
      const recipeDetails = document.querySelector('.recipe-details');

      // Populate recipe details on the page
      // You can format and display the information as needed
      recipeDetails.textContent = `Name: ${recipe.name}\nDescription: ${recipe.description}`;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  }
}

// Call the appropriate function based on the page
if (document.querySelector('.recipe-list')) {
  displayRecipes(); // Display recipe list on the home page
} else if (document.querySelector('.recipe-details')) {
  displayRecipeDetails(); // Display recipe details on the recipe.html page
}
