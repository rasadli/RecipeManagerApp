import React from "react";

const RecipeCard = ({ recipe, onEdit, onDelete }) => {
    return (
        <div
            className="recipe-card"
            // style={{
            //     border: "1px solid #ccc",
            //     padding: "10px",
            //     margin: "10px",
            //     position: "relative",
            // }}
        >
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>Tags: {recipe.tags.join(", ")}</p>
            <p>Last Updated: {new Date(recipe.updatedAt).toLocaleString()}</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default RecipeCard;
