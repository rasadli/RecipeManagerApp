import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeForm from "./RecipeForm";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({ tag: "", difficulty: "" });
    const [sort, setSort] = useState("updated");
    const [showForm, setShowForm] = useState(false);
    const [editingRecipe, setEditingRecipe] = useState(null);

    // Fetch recipes
    useEffect(() => {
        fetch("http://localhost:3000/recipes")
            .then((res) => res.json())
            .then((data) => setRecipes(data));
    }, []);

    // Add or Update Recipe
    const saveRecipe = (recipe) => {
        const url = recipe.id
            ? `http://localhost:3000/recipes/${recipe.id}`
            : "http://localhost:3000/recipes";
        const method = recipe.id ? "PUT" : "POST";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipe),
        })
            .then((res) => res.json())
            .then((data) => {
                if (recipe.id) {
                    setRecipes((prev) =>
                        prev.map((r) => (r.id === recipe.id ? data : r))
                    );
                } else {
                    setRecipes((prev) => [...prev, data]);
                }
                setShowForm(false);
                setEditingRecipe(null);
            });
    };

    // Delete Recipe
    const deleteRecipe = (id) => {
        fetch(`http://localhost:3000/recipes/${id}`, { method: "DELETE" }).then(
            () => {
                setRecipes((prev) => prev.filter((r) => r.id !== id));
            }
        );
    };

    // Filter and Sort Recipes
    const filteredRecipes = recipes
        .filter(
            (recipe) =>
                recipe.title.toLowerCase().includes(search.toLowerCase()) ||
                recipe.description.toLowerCase().includes(search.toLowerCase()) ||
                recipe.ingredients.join(", ").toLowerCase().includes(search.toLowerCase())
        )
        .filter(
            (recipe) =>
                (!filter.tag || recipe.tags.includes(filter.tag)) &&
                (!filter.difficulty || recipe.difficulty === filter.difficulty)
        )
        .sort((a, b) => {
            if (sort === "updated") return new Date(b.updatedAt) - new Date(a.updatedAt);
            if (sort === "title") return a.title.localeCompare(b.title);
            return 0;
        });

    return (
        <div className="recipe-list">
            <h1>Recipe Manager</h1>
            <div className="filters">
                <button onClick={() => setShowForm(true)}>Add Recipe</button>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
                    value={filter.tag}
                >
                    <option value="">All Tags</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Vegetarian">Vegetarian</option>
                </select>
                <select
                    onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
                    value={filter.difficulty}
                >
                    <option value="">All Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <select onChange={(e) => setSort(e.target.value)} value={sort}>
                    <option value="updated">Last Updated</option>
                    <option value="title">Title</option>
                </select>
            </div>
            <div className="recipe-cards">
                {filteredRecipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onEdit={() => {
                            setEditingRecipe(recipe);
                            setShowForm(true);
                        }}
                        onDelete={() => deleteRecipe(recipe.id)}
                    />
                ))}
            </div>
            {showForm && (
                <RecipeForm
                    recipe={editingRecipe}
                    onSave={saveRecipe}
                    onClose={() => {
                        setShowForm(false);
                        setEditingRecipe(null);
                    }}
                />
            )}
        </div>
    );
};

export default RecipeList;
