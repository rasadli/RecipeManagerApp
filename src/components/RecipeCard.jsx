import React from "react";

const RecipeCard = ({ recipe, onEdit, onDelete }) => {
    return (
        < >
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
            <button className="edit-btn" onClick={onEdit}>Edit</button>
            <button className="delete-btn" onClick={onDelete}>Delete</button>
        </>
    );
};

export default RecipeCard;
