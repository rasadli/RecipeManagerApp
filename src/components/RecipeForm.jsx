import React, { useState } from "react";

const RecipeForm = ({ recipe = null, onSave, onClose }) => {
    const [title, setTitle] = useState(recipe?.title || "");
    const [description, setDescription] = useState(recipe?.description || "");
    const [ingredients, setIngredients] = useState(recipe?.ingredients?.join(", ") || "");
    const [tags, setTags] = useState(recipe?.tags?.join(", ") || "");
    const [difficulty, setDifficulty] = useState(recipe?.difficulty || "Easy");

    const isEditMode = recipe && recipe.id;

    const handleSave = () => {
        const updatedRecipe = {
            id: isEditMode ? recipe.id : undefined, // Only add id if in edit mode
            title,
            description,
            ingredients: ingredients.split(",").map(ingredient => ingredient.trim()),
            tags: tags.split(",").map(tag => tag.trim()),
            difficulty,
            createdAt: new Date().toISOString(), // For new recipes, set createdAt
            updatedAt: new Date().toISOString(), // For both, set updatedAt
        };
        onSave(updatedRecipe); 
    };

    return (
        <div className="recipe-form">
            <h3>{isEditMode ? "Edit Recipe" : "Add Recipe"}</h3>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                type="text"
                placeholder="Ingredients (comma-separated)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            />

            <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
            >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

            <button onClick={handleSave}>Save</button>

            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default RecipeForm;
