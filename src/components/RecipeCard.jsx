import React from "react";

const RecipeCard = ({ recipe, onEdit, onDelete, onSelect, isSelected }) => {
    return (
        <>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(recipe.id)}
            />
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <p>Difficulty: <span>{recipe.difficulty}</span></p>
            <p>Tags: <span>{recipe.tags.join(", ")}</span></p>
            <p>Last Updated: <span>{new Date(recipe.updatedAt).toLocaleString()}</span></p>
            <button className="edit-btn" onClick={onEdit}>Edit</button>
            <button className="delete-btn" onClick={onDelete}>Delete</button>
        </>
    );
};

export default RecipeCard;
