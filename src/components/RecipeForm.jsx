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
            id: isEditMode ? recipe.id : undefined,
            title: title.trim(),
            description: description.trim(),
            ingredients: ingredients.split(",").filter(ingredient => ingredient.trim() !== "").map(ingredient => ingredient.trim()),
            tags: tags.split(",").filter(tag => tag.trim() !== "").map(tag => tag.trim()),
            difficulty: difficulty.trim(),
            createdAt: isEditMode ? recipe.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
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
