import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

      // Sort recipes by the newest (based on 'updatedAt' or 'createdAt') and get the top 3
      const sortedRecipes = data
        .filter((recipe) => recipe.updatedAt || recipe.createdAt) // Ensure date exists
        .sort((a, b) => {
          const dateA = new Date(b.updatedAt || b.createdAt);
          const dateB = new Date(a.updatedAt || a.createdAt);
          return dateA - dateB; // Sort newest first
        })
        .slice(0, 3); // Take the top 3 newest recipes

      setPopular(sortedRecipes);
    } catch (error) {
      console.error("Error fetching popular recipes:", error);
    }
  };

  return (
    <Wrapper>
      <h3>Featured Recipes</h3>
      <RecipesContainer>
        {popular.map((recipe) => (
          <Card key={recipe.id}>
            <CardHeader>
              <h4>{recipe.title}</h4>
            </CardHeader>
            <CardBody>
              <p>{recipe.description}</p>
              <IngredientsList>
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </IngredientsList>
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
            </CardBody>
          </Card>
        ))}
      </RecipesContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 2rem auto;
  width: 100%;
  max-width: 1200px;
  text-align: center;

  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 2px solid #ff6f61;
    display: inline-block;
    padding-bottom: 0.5rem;
  }
`;

const RecipesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  background: #ff6f61;
  color: #fff;
  padding: 1rem;
  text-align: center;

  h4 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: bold;
    text-transform: capitalize;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
  text-align: left;

  p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
    color: #555;
  }
`;

const IngredientsList = styled.ul`
  margin: 1rem 0;
  padding-left: 1rem;
  list-style-type: none;

  li {
    font-size: 0.9rem;
    color: #333;
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 1.2rem;

    &::before {
      content: "";
      width: 8px;
      height: 8px;
      background-color: #ff6f61;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

export default Popular;
