// Define the URL of your API endpoint to retrieve recipe data
const recipeApiUrl = 'http://localhost:3000/recipes'; // Update the URL

// Function to fetch and display recipes
async function displayRecipes() {
  try {
    const response = await fetch(recipeApiUrl);
    const recipes = await response.json();
    const recipeList = document.querySelector('.recipe-list');

    recipes.forEach((recipe, index) => {
      const recipeBox = document.createElement('div');
      recipeBox.className = 'recipe-box';

      // Create a div for the thumbnail container
      const thumbnailContainer = document.createElement('div');
      thumbnailContainer.className = 'thumbnail-container';

      // Create an image element for the thumbnail
      const thumbnail = document.createElement('img');
      thumbnail.className = 'home-thumbnail';
      thumbnail.src = `${recipe.image_path}/thumbnail.webp`; // Adjust the filename accordingly

      // Append thumbnail to the container
      thumbnailContainer.appendChild(thumbnail);

      // Create a div for the recipe name
      const recipeName = document.createElement('div');
      recipeName.className = 'recipe-name';
      recipeName.textContent = recipe.name;

      // Add click event to navigate to the recipe detail page
      recipeBox.addEventListener('click', () => {
        window.location.href = `recipe.html?id=${recipe.id}`;
      });

      recipeBox.appendChild(thumbnailContainer);
      recipeBox.appendChild(recipeName);
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
    try {
      // Fetch detailed recipe information including ingredients and instructions
      const response = await fetch(`${recipeApiUrl}/${recipeId}`);
      const recipe = await response.json();

      // Fetch ingredients for the recipe
      const responseIngredients = await fetch(
        `${recipeApiUrl}/${recipeId}/ingredients`
      );
      const ingredients = await responseIngredients.json();

      // Fetch instructions for the recipe
      const responseInstructions = await fetch(
        `${recipeApiUrl}/${recipeId}/instructions`
      );
      const instructions = await responseInstructions.json();

      // Select the section to display information
      const recipeDetails = document.querySelector('.recipe-details');

      // Create an h1 element for the recipe name
      const recipeTitle = document.createElement('h1');
      recipeTitle.textContent = recipe.name;

      // Create an image element for the thumbnail
      const thumbnail = document.createElement('img');
      thumbnail.src = `${recipe.image_path}/thumbnail.webp`;

      // Create a div for description
      const description = document.createElement('div');
      description.textContent = recipe.description;

      // Create a div for ingredients
      const ingredientsDiv = document.createElement('div');
      ingredientsDiv.className = 'recipe-section';

      // Populate ingredients
      const ingredientsTitle = document.createElement('h2');
      ingredientsTitle.textContent = 'Ingredients';
      ingredientsDiv.appendChild(ingredientsTitle);

      // Loop through ingredients array
      ingredients.forEach((ingredient) => {
        const ingredientItem = document.createElement('p');
        ingredientItem.textContent = `${ingredient.name}: ${ingredient.quantity}`;
        ingredientsDiv.appendChild(ingredientItem);
      });

      // Create a div for instructions
      const instructionsDiv = document.createElement('div');
      instructionsDiv.className = 'recipe-section';

      // Populate instructions
      const instructionsTitle = document.createElement('h2');
      instructionsTitle.textContent = 'Instructions';
      instructionsDiv.appendChild(instructionsTitle);

      // Loop through instructions array
      instructions.forEach((instruction) => {
        const instructionItem = document.createElement('div');
        instructionItem.className = 'instruction';

        // Create an image element for each step
        const stepImage = document.createElement('img');
        stepImage.src = `${recipe.image_path}/step${instruction.step_order}.webp`; // Adjust the filename accordingly

        const stepDescription = document.createElement('p');
        stepDescription.textContent = `Step ${instruction.step_order}: ${instruction.description}`;

        instructionItem.appendChild(stepImage);
        instructionItem.appendChild(stepDescription);
        instructionsDiv.appendChild(instructionItem);
      });

      // Append all elements to the recipeDetails container
      recipeDetails.appendChild(recipeTitle);
      recipeDetails.appendChild(thumbnail);
      recipeDetails.appendChild(description);
      recipeDetails.appendChild(ingredientsDiv);
      recipeDetails.appendChild(instructionsDiv);
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
