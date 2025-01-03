# Recipe Manager App

## Overview
The Recipe Manager App is a React-based application that allows users to create, view, edit, delete, and organize recipes. It features JSON-Server integration to manage the backend storage for recipes and messages.

## Features
- **Recipe Management**:
  - Add new recipes with details like title, description, ingredients, preparation steps, tags, difficulty level, and last updated date.
  - Edit and update existing recipes.
  - Delete recipes.
- **Search and Filter**:
  - Search recipes by title, description, or ingredients.
  - Filter recipes by tags or difficulty level.
  - Sort recipes by various attributes (title, create/update time, tags, difficulty).
- **Pagination** :
  - Load more recipes as the page changes.
- **Contact Page**:
  - Submit messages that are stored in the JSON-Server.

## Setup Instructions

### Prerequisites
- Node.js and npm installed on your system.
- Git installed.

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

3. **Start the JSON-Server**:
   - Navigate to the directory containing `db.json` (or create it as needed).
   - Start the server:
     ```bash
     npx json-server --watch db.json --port 3000
     ```

4. **Run the React Application**:
   ```bash
   npm start
   ```
   - The application will be available at `http://localhost:3000`.

## Project Structure
```
RecipeManagerApp/
├── public/
├── src/
│   ├── components/      # React components for the app
│   ├── pages/           # Pages like Home, Recipe, Contact
│   ├── services/        # API service functions
│   ├── App.js           # Main application entry point
│   ├── index.js         # React DOM rendering
├── db.json              # JSON-Server database
├── package.json         # Dependencies and scripts
├── README.md            # Documentation
```

## API Endpoints
- **Recipes**: `http://localhost:3000/recipes`
  - GET: Fetch all recipes.
  - POST: Add a new recipe.
  - PUT: Update a recipe.
  - DELETE: Remove a recipe.
- **Messages**: `http://localhost:3000/messages`
  - POST: Submit a contact message.

## Bonus Features
- Share recipes via JSON email format.
- Drag and drop to reorder recipes, with persistent changes.

## Design and Tools
- React for UI.
- JSON-Server for backend storage.
- CSS frameworks (e.g., Tailwind CSS or Bootstrap) for styling.
- SweetAlert for alerts.

## Contribution Guidelines
- Ensure proper use of React hooks and components.
- Commit changes frequently with meaningful messages.
- Follow coding standards and best practices.

## Deployment
If deployed, include the link to the live application or GitHub Pages here.

---
**Contact:**
For any issues or inquiries, feel free to reach out via the Contact page in the app.
