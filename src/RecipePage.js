import React from 'react';

const RecipePage = () => {
  // First Recipe: Chocolate Cake
  const chocolateCake = {
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
    last_updated: "2024-12-20T12:00:00Z"
  };

  // Second Recipe: Spaghetti Carbonara
  const spaghettiCarbonara = {
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g Pecorino Romano cheese, grated",
      "50g Parmesan cheese, grated",
      "Freshly ground black pepper",
      "Salt"
    ],
    preparation_steps: [
      "Boil a large pot of salted water and cook the spaghetti until al dente.",
      "Meanwhile, fry the pancetta in a pan over medium heat until crispy.",
      "In a bowl, whisk the eggs and grated cheeses together, then season with pepper.",
      "Once the pasta is done, reserve some of the cooking water, then drain the spaghetti.",
      "Add the spaghetti to the pan with pancetta and toss to coat.",
      "Remove the pan from heat and quickly stir in the egg and cheese mixture, adding a little pasta water if needed to create a creamy sauce.",
      "Serve immediately, topped with more cheese and black pepper."
    ],
    tags: ["Main Course", "Italian", "Pasta", "Quick Meal"],
    difficulty_level: "Medium",
    last_updated: "2024-12-20T12:00:00Z"
  };

  return (
    <div className="recipe-page">
      <h1>Recipe Page</h1>

      <div className="recipe">
        <h2>{chocolateCake.title}</h2>
        <p>{chocolateCake.description}</p>
        <h3>Ingredients:</h3>
        <ul>
          {chocolateCake.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Preparation Steps:</h3>
        <ol>
          {chocolateCake.preparation_steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <p><strong>Tags:</strong> {chocolateCake.tags.join(", ")}</p>
        <p><strong>Difficulty Level:</strong> {chocolateCake.difficulty_level}</p>
        <p><strong>Last Updated:</strong> {chocolateCake.last_updated}</p>
      </div>

      <div className="recipe">
        <h2>{spaghettiCarbonara.title}</h2>
        <p>{spaghettiCarbonara.description}</p>
        <h3>Ingredients:</h3>
        <ul>
          {spaghettiCarbonara.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Preparation Steps:</h3>
        <ol>
          {spaghettiCarbonara.preparation_steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <p><strong>Tags:</strong> {spaghettiCarbonara.tags.join(", ")}</p>
        <p><strong>Difficulty Level:</strong> {spaghettiCarbonara.difficulty_level}</p>
        <p><strong>Last Updated:</strong> {spaghettiCarbonara.last_updated}</p>
      </div>

    </div>
  );
};

export default RecipePage;
