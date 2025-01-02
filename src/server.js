/*const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Path to the recipes.json file
const recipesFilePath = path.join(__dirname, 'recipes.json');

// Helper function to read recipes from the JSON file
const readRecipesFromFile = () => {
  if (!fs.existsSync(recipesFilePath)) {
    return null;
  }

  const data = fs.readFileSync(recipesFilePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write recipes to the JSON file
const writeRecipesToFile = (data) => {
  fs.writeFileSync(recipesFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// Route to get the recipe
app.get('/recipe', (req, res) => {
  const recipe = readRecipesFromFile();

  if (!recipe) {
    return res.status(404).json({ error: 'No recipe found.' });
  }

  res.json(recipe);
});

// Route to insert (create) a new recipe
app.post('/recipe', (req, res) => {
  const newRecipe = req.body;

  if (!newRecipe.title || !newRecipe.description) {
    return res.status(400).json({ error: 'Title and description are required fields.' });
  }

  const recipe = {
    ...newRecipe,
    last_updated: new Date().toISOString(),
  };

  // Save to JSON file
  writeRecipesToFile(recipe);

  res.status(201).json({ message: 'Recipe created successfully!', recipe });
});

// Route to update the existing recipe
app.put('/recipe', (req, res) => {
  const updatedRecipe = req.body;

  if (!updatedRecipe) {
    return res.status(400).json({ error: 'Invalid data. Provide recipe details.' });
  }

  const existingRecipe = readRecipesFromFile();

  if (!existingRecipe) {
    return res.status(404).json({ error: 'No recipe found to update.' });
  }

  const recipe = {
    ...existingRecipe,
    ...updatedRecipe,
    last_updated: new Date().toISOString(),
  };

  // Save updated recipe to JSON file
  writeRecipesToFile(recipe);

  res.json({ message: 'Recipe updated successfully!', recipe });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
*/