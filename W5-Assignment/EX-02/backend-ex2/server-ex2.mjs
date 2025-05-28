import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import data from "../src/data-ex2.js"; // ES module import

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use data from data-ex2.js
const articles = data.articles || [];
const journalists = data.journalists || [];
const categories = data.categories || [];

// Get all articles
app.get("/articles", (req, res) => {
  let filtered = articles;

  if (req.query.journalistId) {
    filtered = filtered.filter(
      (a) => String(a.journalistId) === String(req.query.journalistId)
    );
  }

  if (req.query.categoryId) {
    filtered = filtered.filter(
      (a) => String(a.categoryId) === String(req.query.categoryId)
    );
  }

  res.json(filtered);
});

// Get single article by id
app.get("/articles/:id", (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json(article);
});

// Get all journalists
app.get("/journalists", (req, res) => {
  res.json(journalists);
});

// Get all categories
app.get("/categories", (req, res) => {
  res.json(categories);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
