import React, { useEffect, useState } from "react";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    try {
      const response = await fetch("http://localhost:3001/recipes");
      if (!response.ok) {
        throw new Error("Failed to fetch data from JSON server");
      }
      const data = await response.json();

      const sortedRecipes = data
        .filter((recipe) => recipe.updatedAt || recipe.createdAt)
        .sort((a, b) => {
          const dateA = new Date(b.updatedAt || b.createdAt);
          const dateB = new Date(a.updatedAt || a.createdAt);
          return dateA - dateB; 
        })
        .slice(0, 3); // Take the top 3 newest recipes

      setPopular(sortedRecipes);
    } catch (error) {
      console.error("Error fetching popular recipes:", error);
    }
  };

  return (
    <div className="wrapper">
      <h3>Featured Recipes</h3>
      <div className="recipes-container">
        {popular.map((recipe) => (
          <div key={recipe.id} className="card">
            <div className="card-header">
              <h4>{recipe.title}</h4>
            </div>
            <div className="card-body">
              <p>{recipe.description}</p>
              <ul className="ingredients-list">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <p>
                <strong>Difficulty:</strong> {recipe.difficulty}
              </p>
              <p>
                <strong>Tags:</strong> {recipe.tags?.join(", ")}
              </p>
              <p>
                <strong>Last Updated:</strong>{" "}
                {recipe.updatedAt
                  ? new Date(recipe.updatedAt).toLocaleString()
                  : recipe.createdAt
                    ? new Date(recipe.createdAt).toLocaleString()
                    : "Not Available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
