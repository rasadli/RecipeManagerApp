import React, { useState } from "react";

const RecipeForm = ({ recipe = {}, onSave, onClose }) => {
    const [title, setTitle] = useState(recipe.title || "");
    const [description, setDescription] = useState(recipe.description || "");
    const [ingredients, setIngredients] = useState(recipe.ingredients || []);
    const [tags, setTags] = useState(recipe.tags || []);
    const [difficulty, setDifficulty] = useState(recipe.difficulty || "Easy");

    const handleSave = () => {
        const updatedRecipe = {
            id: recipe.id,
            title,
            description,
            ingredients: ingredients.split(","),
            tags: tags.split(","),
            difficulty,
            updatedAt: new Date().toISOString(),
        };
        onSave(updatedRecipe);
    };

    return (
        <div 
        // style={{ border: "1px solid #ccc", padding: "20px" }} 
        className="recipe-form ">
            <h3>{recipe.id ? "Edit Recipe" : "Add Recipe"}</h3>
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
