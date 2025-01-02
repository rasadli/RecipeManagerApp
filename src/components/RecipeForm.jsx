import React, { useState } from "react";

const RecipeForm = ({ recipe = null, onSave, onClose }) => {
    // Initialize state with default values for a new recipe
    const [title, setTitle] = useState(recipe?.title || "");
    const [description, setDescription] = useState(recipe?.description || "");
    const [ingredients, setIngredients] = useState(recipe?.ingredients?.join(", ") || "");
    const [tags, setTags] = useState(recipe?.tags?.join(", ") || "");
    const [difficulty, setDifficulty] = useState(recipe?.difficulty || "Easy");

    // Determine if it's an edit mode (when there's an existing recipe)
    const isEditMode = recipe && recipe.id;

    const handleSave = () => {
        // Prepare the recipe object
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
        onSave(updatedRecipe); // Pass the recipe object back to parent
    };

    return (
        <div className="recipe-form">
            <h3>{isEditMode ? "Edit Recipe" : "Add Recipe"}</h3>
            
            {/* Title Input */}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* Description Input */}
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* Ingredients Input */}
            <input
                type="text"
                placeholder="Ingredients (comma-separated)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            />

            {/* Tags Input */}
            <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            {/* Difficulty Select */}
            <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
            >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

            {/* Save Button */}
            <button onClick={handleSave}>Save</button>
            
            {/* Cancel Button */}
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default RecipeForm;
