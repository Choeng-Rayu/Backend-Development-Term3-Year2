
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory articles store (replace with DB in production)
let articles = [];
let nextId = 1;

// Get all articles
app.get('/articles', (req, res) => {
  res.json(articles);
});

// Get single article by id
app.get('/articles/:id', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ error: 'Article not found' });
  res.json(article);
});

// Create new article
app.post('/articles', (req, res) => {
  const { title, content, journalistId, categoryId } = req.body;
  if (!title || !content || !journalistId || !categoryId) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newArticle = {
    id: nextId++,
    title,
    content,
    journalistId,
    categoryId,
  };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

// Update article
app.put('/articles/:id', (req, res) => {
  const { title, content, journalistId, categoryId } = req.body;
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ error: 'Article not found' });

  article.title = title || article.title;
  article.content = content || article.content;
  article.journalistId = journalistId || article.journalistId;
  article.categoryId = categoryId || article.categoryId;

  res.json(article);
});

// Delete article
app.delete('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = articles.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ error: 'Article not found' });
  articles.splice(index, 1);
  res.json({ message: 'Article deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});