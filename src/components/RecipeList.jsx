import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeForm from "./RecipeForm";
import Swal from "sweetalert2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({ tag: "", difficulty: "" });
    const [sort, setSort] = useState("updated");
    const [showForm, setShowForm] = useState(false);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = () => {
        setLoading(true);
        fetch("http://localhost:3001/recipes")
            .then((res) => res.json())
            .then((data) => setRecipes(data))
            .catch(() => {
                Swal.fire("Error", "Failed to fetch recipes. Please try again.", "error");
            })
            .finally(() => setLoading(false));
    };

    const saveRecipe = (recipe) => {
        const url = recipe.id
            ? `http://localhost:3001/recipes/${recipe.id}`
            : "http://localhost:3001/recipes";
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
                Swal.fire("Success", "Recipe saved successfully!", "success");
            })
            .catch(() => {
                Swal.fire("Error", "Failed to save recipe. Please try again.", "error");
            });
    };

    const deleteRecipe = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3001/recipes/${id}`, { method: "DELETE" })
                    .then(() => {
                        setRecipes((prev) => prev.filter((r) => r.id !== id));
                        Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error", "Failed to delete recipe. Please try again.", "error");
                    });
            }
        });
    };

    const filteredRecipes = recipes
        .filter((recipe) =>
            [recipe.title, recipe.description, recipe.ingredients.join(", ")].some((field) =>
                field.toLowerCase().includes(search.toLowerCase())
            )
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

    const handleDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return;

        // Reorder the recipes array based on the drag result
        const reorderedRecipes = Array.from(recipes);
        const [movedItem] = reorderedRecipes.splice(source.index, 1);
        reorderedRecipes.splice(destination.index, 0, movedItem);

        setRecipes(reorderedRecipes);

        // Optionally, update the backend with the new order
        fetch("http://localhost:3001/recipes/reorder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reorderedRecipes }),
        }).catch(() => {
            Swal.fire("Error", "Failed to reorder recipes. Please try again.", "error");
        });
    };

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
                <select onChange={(e) => setFilter({ ...filter, tag: e.target.value })} value={filter.tag}>
                    <option value="">All Tags</option>
                    {Array.from(new Set(recipes.flatMap((r) => r.tags))).map((tag, index) => (
                        <option key={index} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })} value={filter.difficulty}>
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

            {loading ? (
                <p>Loading...</p>
            ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="recipes-list" direction="vertical">
                        {(provided) => (
                            <div
                                className="recipe-cards"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {filteredRecipes.map((recipe, index) => (
                                    <Draggable key={recipe.id} draggableId={recipe.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                className="recipe-card"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <RecipeCard
                                                    recipe={recipe}
                                                    onEdit={() => {
                                                        setEditingRecipe(recipe);
                                                        setShowForm(true);
                                                    }}
                                                    onDelete={() => deleteRecipe(recipe.id)}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <RecipeForm
                            recipe={editingRecipe}
                            onSave={saveRecipe}
                            onClose={() => {
                                setShowForm(false);
                                setEditingRecipe(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeList;
