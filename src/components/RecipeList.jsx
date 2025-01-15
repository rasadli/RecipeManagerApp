import emailjs from '@emailjs/browser';
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import RecipeCard from "./RecipeCard";
import RecipeForm from "./RecipeForm";
import SendRecipesModal from "./SendRecipesModal";

const RecipeList = () => {
    const API_URL = "http://localhost:3001/recipes";
    // You should place your SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY EmailJS website https://www.emailjs.com/
    const SERVICE_ID = "<SERVICE_ID>";
    const TEMPLATE_ID = "<TEMPLATE_ID>";
    const PUBLIC_KEY = "<PUBLIC_KEY>";

    const [userName, setUserName] = useState("");
    const [recipentEmail, setRecipentEmail] = useState("");
    const [emailSubject, setEmailSubject] = useState("");

    const [recipes, setRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({ tag: "", difficulty: "" });
    const [sort, setSort] = useState("default");
    const [showForm, setShowForm] = useState(false);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shouldFetchRecipes, setShouldFetchRecipes] = useState(true);

    useEffect(() => {
        if (shouldFetchRecipes) {
            fetchRecipes();
            setShouldFetchRecipes(false); // Reset the trigger
        }
    }, [shouldFetchRecipes]);

    const fetchRecipes = () => {
        setLoading(true);
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                const sortedRecipes = data.sort((a, b) => a.order - b.order);
                setRecipes(sortedRecipes);
            })
            .catch(() => {
                Swal.fire("Error", "Failed to fetch recipes. Please try again.", "error");
            })
            .finally(() => setLoading(false));
    };

    // useEffect hook to handle filtering and search changes
    useEffect(() => {
        setShouldFetchRecipes(true);
        setCurrentPage(1);
    }, [filter, search]);

    const saveRecipe = (recipe) => {

        if (!recipe.id) {
            const maxOrder = Math.max(...recipes.map((r) => r.order || 0), 0); // Default to 0 if no order exists
            recipe.order = maxOrder + 1;
        }

        const url = recipe.id ? `${API_URL}/${recipe.id}` : API_URL;
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
                setShouldFetchRecipes(true);
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
                fetch(`${API_URL}/${id}`, { method: "DELETE" })
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

    const toggleSelectRecipe = (recipeId) => {
        setSelectedRecipes((prev) =>
            prev.includes(recipeId)
                ? prev.filter((id) => id !== recipeId)
                : [...prev, recipeId]
        );
    };

    const sendSelectedRecipes = () => {
        if (selectedRecipes.length == 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Recipes Selected!',
                text: 'No recipes selected to share!',
            });
            return;
        }

        if (!userName || !recipentEmail || !emailSubject) {
            Swal.fire({
                icon: 'info',
                title: 'Incomplete Information!',
                text: "Please provide your name, the recipient's email, and the email subject!",
            });
            return;
        }

        const recipesToSend = recipes.filter((recipe) =>
            selectedRecipes.includes(recipe.id)
        );

        const formattedRecipes = recipesToSend
            .map((recipe, index) => {
                const recipeDetails = [
                    `Recipe ${index + 1}:`,
                    `- Name: ${recipe.title || 'Not available'}`,
                    recipe.description ? `- Description: ${recipe.description}` : '- Description: Not available',
                    Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0
                        ? `- Ingredients: ${recipe.ingredients.join(", ")}`
                        : '- Ingredients: Not available',
                    Array.isArray(recipe.steps) && recipe.steps.length > 0
                        ? `- In   structions: ${recipe.steps.join(", ")}`
                        : '- Instructions: Not available',
                    Array.isArray(recipe.tags) && recipe.tags.length > 0
                        ? `- Tags: ${recipe.tags.join(", ")}`
                        : '- Tags: Not available',
                    recipe.difficulty ? `- Difficulty: ${recipe.difficulty}` : '- Difficulty: Not available',
                    recipe.lastUpdated
                        ? `- Last Updated: ${new Date(recipe.lastUpdated).toLocaleString()}`
                        : '- Last Updated: Not available',
                    recipe.order !== undefined ? `- Order: ${recipe.order}` : '- Order: Not available'
                ];

                return recipeDetails.filter(detail => detail !== '').join("\n");
            })
            .join("\n\n");


        const emailPayload = {
            subject: emailSubject,
            email_to: recipentEmail,
            message: `Hello,\n\nHere are the selected recipes:\n\n${formattedRecipes}\n\nBest regards,\n${userName}`,
            from_name: userName,
        };

        emailjs
            .send(SERVICE_ID, TEMPLATE_ID, emailPayload, PUBLIC_KEY)
            .then(() => {
                Swal.fire("Success", "Recipes sent successfully!", "success");
                setSelectedRecipes([]);
                setIsModalOpen(false);  // Close modal after sending email
                setUserName('')
                setRecipentEmail('')
                setEmailSubject('')
            })
            .catch(() => {
                Swal.fire("Error", "Failed to send recipes. Please try again.", "error");
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

    const indexOfLastRecipe = currentPage * itemsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const reorderedRecipes = Array.from(recipes);
        const [movedRecipe] = reorderedRecipes.splice(result.source.index, 1);
        reorderedRecipes.splice(result.destination.index, 0, movedRecipe);

        const updatedRecipes = reorderedRecipes.map((recipe, index) => ({
            ...recipe,
            order: index + 1,
        }));

        setRecipes(updatedRecipes);
        try {
            for (const recipe of updatedRecipes) {
                saveRecipe(recipe);
            }
            Swal.fire("Success", "Recipes reordered successfully!", "success");
        } catch (error) {
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
                    <option value="default">No sort</option>
                    <option value="updated">Last Updated</option>
                    <option value="title">Title</option>
                </select>

                <select onChange={(e) => setItemsPerPage(Number(e.target.value))} value={itemsPerPage}>
                    <option value={5}>5 items per page</option>
                    <option value={10}>10 items per page</option>
                    <option value={15}>15 items per page</option>
                    <option value={20}>20 items per page</option>
                </select>

                <button onClick={() => setIsModalOpen(true)}>Send Selected Recipes</button>
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
                                                    isSelected={selectedRecipes.includes(recipe.id)}
                                                    onSelect={toggleSelectRecipe}
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

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>


            <SendRecipesModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userName={userName}
                setUserName={setUserName}
                recipentEmail={recipentEmail}
                setRecipentEmail={setRecipentEmail}
                emailSubject={emailSubject}
                setEmailSubject={setEmailSubject}
                onSend={sendSelectedRecipes}
            />


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