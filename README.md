# Recipe Manager App

## Overview
The Recipe Manager App is a React-based application designed to manage recipes efficiently. It allows users to create, view, edit, delete, and organize recipes, with a seamless backend powered by JSON-Server. This app is user-friendly and feature-rich, catering to culinary enthusiasts and professionals alike.

## Features

### Recipe Management
- Add new recipes with details like:
  - Title
  - Description
  - Ingredients
  - Preparation steps
  - Tags
  - Difficulty level
  - Last updated date
- Edit and update existing recipes.
- Delete recipes.

### Search and Filter
- Search recipes by:
  - Title
  - Description
  - Ingredients
- Filter recipes by tags or difficulty level.
- Sort recipes by attributes like title, create/update time, tags, or difficulty.

### Pagination and Items per Page
- Load more recipes with intuitive pagination.
- Change the number of recipes displayed per page.

### Contact Page
- Submit messages that are stored in the JSON-Server.

### Share Recipes
- Select multiple recipes and share them via email in JSON format.

### Pages Overview

#### Home Page
- Displays a welcome message and featured recipes.
- Highlights popular recipes in a dedicated section.

#### Recipes Page
- View all recipes in a list format.
- Perform operations like add, edit, delete, search, and filter recipes.
- Drag and drop recipes to reorder them with persistent changes.
- Paginate through recipes and change the number of items per page.
- Share selected recipes via email.

#### Contact Page
- Submit inquiries or feedback via a contact form.
- Messages are saved to the backend for further review.

## Setup Instructions

### Prerequisites
- Ensure Node.js and npm are installed.
- Git should be installed to clone the repository.

### Steps to Run the Application

1. **Clone the Repository**:
   ```bash
   git clone <https://github.com/rasadli/RecipeManagerApp>
   cd RecipeManagerApp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   - Start both the React app and JSON-Server simultaneously with:
     ```bash
     npm start
     ```
   - The application will open at `http://localhost:3000`.

4. **Handling Port Issues**:
   - If port 3000 is already in use, kill the process running on that port:
     ```bash
     npx kill-port 3000
     ```
   - Then rerun the application with `npm start`.

## Project Structure
```
RecipeManagerApp/
├── public/
│   ├── favicon.ico                   # Application favicon
│   ├── index.html                    # Main HTML file
│   ├── manifest.json                 # Metadata for the app
├── src/
│   ├── components/                   # React components
│   │   ├── Contact.jsx               # Contact page component
│   │   ├── Home.jsx                  # Home page component
│   │   ├── Navbar.jsx                # Navigation bar component
│   │   ├── Popular.jsx               # Popular recipes section
│   │   ├── RecipeCard.jsx            # Individual recipe card
│   │   ├── RecipeForm.jsx            # Form for adding/editing recipes
│   │   ├── RecipeList.jsx            # List of all recipes
│   │   ├── SendRecipesModal.jsx      # Modal for sharing recipes
│   ├── db.json                       # JSON-Server database
│   ├── index.css                     # Global styles
│   ├── index.js                      # React DOM rendering
│   ├── App.jsx                       # Main application entry point
├── package.json                      # Dependencies and scripts
├── README.md                         # Documentation
```

## API Endpoints
- **Recipes**: `http://localhost:3001/recipes`
  - GET: Fetch all recipes.
  - POST: Add a new recipe.
  - PUT: Update a recipe.
  - DELETE: Remove a recipe.
- **Messages**: `http://localhost:3001/messages`
  - POST: Submit a contact message.

## Bonus Features
- Share recipes in JSON email format.
- Drag and drop to reorder recipes with persistent updates.
- Interactive modals for better user engagement.

## Design and Tools
- React for UI development.
- JSON-Server for backend storage.
- Bootstrap for responsive styling.
- SweetAlert for alerts and notifications.
