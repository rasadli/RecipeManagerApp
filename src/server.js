const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Dummy recipe data (in-memory storage)
let recipe = {
  title: "Chocolate Cake",
  description: "A rich and moist chocolate cake perfect for dessert.",
  ingredients: [
    "1 3/4 cups all-purpose flour",
    "3/4 cup cocoa powder",
    "2 cups sugar",
    "1 1/2 teaspoons baking soda",
    "1/2 teaspoon baking powder",
    "2 large eggs",
    "1 cup buttermilk",
    "1/2 cup vegetable oil",
    "2 teaspoons vanilla extract",
    "1 cup boiling water"
  ],
  preparation_steps: [
    "Preheat the oven to 350°F (175°C).",
    "Grease and flour two 9-inch round cake pans.",
    "Mix the dry ingredients in a bowl.",
    "Add eggs, buttermilk, oil, and vanilla. Beat until smooth.",
    "Stir in boiling water (batter will be thin).",
    "Pour batter into prepared pans.",
    "Bake for 30-35 minutes or until a toothpick comes out clean.",
    "Cool for 10 minutes, then remove from pans."
  ],
  tags: ["Dessert", "Vegetarian", "Baking", "Quick Meal"],
  difficulty_level: "Medium",
  last_updated: new Date().toISOString()
};

// Route to get the recipe
app.get('/recipe', (req, res) => {
  res.json(recipe);
});

// Route to insert (create) a new recipe
app.post('/recipe', (req, res) => {
  const newRecipe = req.body;

  if (!newRecipe.title || !newRecipe.description) {
    return res.status(400).json({ error: "Title and description are required fields." });
  }

  // Save new recipe data
  recipe = {
    ...newRecipe,
    last_updated: new Date().toISOString(),
  };

  res.status(201).json({ message: "Recipe created successfully!", recipe });
});

// Route to update the existing recipe
app.put('/recipe', (req, res) => {
  const updatedRecipe = req.body;

  if (!updatedRecipe) {
    return res.status(400).json({ error: "Invalid data. Provide recipe details." });
  }

  // Update only provided fields
  recipe = {
    ...recipe,
    ...updatedRecipe,
    last_updated: new Date().toISOString(),
  };

  res.json({ message: "Recipe updated successfully!", recipe });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Dummy server is running at http://localhost:${PORT}`);
});
