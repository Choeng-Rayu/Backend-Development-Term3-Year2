# Assignment Explanation: Full-Stack Article Management System

## Overview
This project is a full-stack web application for managing news articles, journalists, and categories. It uses a MySQL database, a Node.js/Express backend, and a React frontend. The system supports CRUD operations for articles, displays journalist and category information, and allows filtering and navigation by journalist and category.

---

## Backend Summary
- **Database:**
  - Tables: `Articles`, `journalists`, and `Category`.
  - Relationships: Each article references a journalist and a category (foreign keys).
- **API Endpoints:**
  - CRUD for articles.
  - Fetch articles with journalist/category info (using SQL JOINs).
  - Fetch all articles by journalist ID or name.
  - Fetch all categories and articles by category.
- **Repository Layer:**
  - Contains SQL queries for all the above, using parameterized queries for security.
- **Controllers:**
  - Handle HTTP requests, call repository functions, and return JSON responses.
- **Routes:**
  - Map HTTP endpoints to controller functions.

---

## Frontend Summary

### Structure
- Built with React.
- Uses React Router for navigation.
- Main components:
  - `ArticleList.jsx`: Lists all articles, allows filtering by category, and shows journalist/category names.
  - `ArticlePage.jsx`: Shows full details of a single article, including journalist and category.
  - `ArticleForm.jsx`: Form for creating or editing an article.
  - `JournalistArticles.jsx`: Shows all articles written by a specific journalist.
- API calls are abstracted in `services/api.js`.

### Key Features & How They Work

1. **Article List (`ArticleList.jsx`):**
   - Fetches articles from `/api/articles-with-journalist`.
   - Fetches categories from `/api/categories`.
   - Allows filtering articles by category using a dropdown.
   - Each article card shows title, journalist, and category.
   - Buttons for Edit, Delete, and View.
   - When a category is selected, fetches articles for that category only.

2. **Article Details (`ArticlePage.jsx`):**
   - Fetches article by ID from `/api/articles/:id/full`.
   - Displays title, content, journalist name, and category.
   - (Optionally) Journalist name can be a link to view all their articles.

3. **Create/Edit Article (`ArticleForm.jsx`):**
   - Form for creating or editing an article.
   - On submit, sends data to backend to create or update the article.
   - Uses controlled form fields for title, content, journalist, and category.

4. **Journalist Articles (`JournalistArticles.jsx`):**
   - Uses the journalist ID from the URL.
   - Fetches articles from `/api/journalists/:id/articles`.
   - Displays a list of articles for that journalist.

5. **API Service (`services/api.js`):**
   - Centralizes all HTTP requests to the backend.
   - Functions for fetching articles, categories, deleting, etc.
   - Uses Axios for HTTP requests.

### Navigation
- **React Router** is used for all navigation:
  - `/articles` → Article list
  - `/articles/:id` → Article details
  - `/articles/add` → Create article
  - `/articles/:id/edit` → Edit article
  - `/journalists/:id/articles` → All articles by a journalist

### User Experience
- Users can:
  - View all articles, filter by category, and see journalist/category names.
  - Click on an article to see details.
  - Click on a journalist to see all their articles.
  - Add, edit, or delete articles.
  - Filter articles by category using a dropdown.

---

## How the Frontend and Backend Work Together
- The frontend makes HTTP requests to the backend API.
- The backend queries the MySQL database, often using SQL JOINs to combine article, journalist, and category data.
- The backend returns JSON, which the frontend displays.
- Filtering and navigation are handled on the frontend, but the actual data filtering (by category or journalist) is done by the backend for efficiency.

---

## Conclusion
This assignment demonstrates a complete, modern full-stack workflow:
- **Database**: Relational design with foreign keys.
- **Backend**: RESTful API with SQL JOINs for rich data.
- **Frontend**: React SPA with dynamic routing, filtering, and CRUD UI.
- **Best Practices**: Separation of concerns, parameterized queries, and clear code comments.

This structure makes the application scalable, maintainable, and user-friendly.
