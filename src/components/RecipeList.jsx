import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeForm from "./RecipeForm";
import Swal from "sweetalert2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const RecipeList = () => {
    const API_URL = "http://localhost:3001/recipes";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({ tag: "", difficulty: "" });
    const [sort, setSort] = useState("updated");
    const [showForm, setShowForm] = useState(false);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust the number of items per page

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = () => {
        setLoading(true);
        fetch("http://localhost:3001/recipes")
            .then((res) => res.json())
            .then((data) => {
                // Sort the recipes by the `order` property
                const sortedRecipes = data.sort((a, b) => a.order - b.order);
                setRecipes(sortedRecipes);
            })
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
                (null);
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

    // Calculate the indices of the recipes to show on the current page
    const indexOfLastRecipe = currentPage * itemsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const handleDragEnd = async (result) => {
        if (!result.destination) return;
    
        const reorderedRecipes = Array.from(recipes);
        const [movedRecipe] = reorderedRecipes.splice(result.source.index, 1);
        reorderedRecipes.splice(result.destination.index, 0, movedRecipe);
    
        // Update the order values
        const updatedRecipes = reorderedRecipes.map((recipe, index) => ({
            ...recipe,
            order: index + 1, // Adjust the order field as necessary
        }));
    
        setRecipes(updatedRecipes); // Optimistic UI update
        try {
            for (const recipe of updatedRecipes) {
                console.log(recipe)
                saveRecipe(recipe)
            }
            Swal.fire("Success", "Recipes reordered successfully!", "success");
        } catch (error) {
            console.error("Error updating order:", error);
            Swal.fire("Error", "Failed to reorder recipes. Please try again.", "error");
        }
        
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

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
                                {currentRecipes.map((recipe, index) => (
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

            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

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
