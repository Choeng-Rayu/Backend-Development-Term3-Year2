import express, { json } from "express";
import cors from "cors";
import articleRouter from "./routes/articleRoutes.js";
import journalistRouter from "./routes/journalistRoutes.js";
import { getArticlesWithJournalist, getCategories, getArticlesByCategoryId, getArticleWithJournalistById } from "./controllers/articleController.js";

const app = express();

// Enable CORS for all routes and origins
app.use(cors());

// Enable json serialization
app.use(json());

app.use("/api/articles", articleRouter);
app.use("/api/journalists", journalistRouter);

// Extra endpoints for joined data
app.get("/api/articles-with-journalist", getArticlesWithJournalist);
app.get("/api/articles/:id/full", getArticleWithJournalistById); // article + journalist name
app.get("/api/categories", getCategories); // Get all categories
app.get("/api/categories/:id/articles", getArticlesByCategoryId); // Get articles by category

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});