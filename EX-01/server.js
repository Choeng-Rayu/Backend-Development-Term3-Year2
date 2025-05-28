import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let articles = [];
let nextId = 1;

// Get all articles
app.get('/articles', (req, res) => {
  res.json(articles);
});

// Get article by id
app.get('/articles/:id', (req, res) => {
  const article = articles.find(a => a.id === Number(req.params.id));
  if (article) res.json(article);
  else res.status(404).json({ error: 'Article not found' });
});

// Add new article
app.post('/articles', (req, res) => {
  const article = { ...req.body, id: nextId++ };
  articles.push(article);
  res.status(201).json(article);
});

// Update article
app.put('/articles/:id', (req, res) => {
  const idx = articles.findIndex(a => a.id === Number(req.params.id));
  if (idx !== -1) {
    articles[idx] = { ...req.body, id: Number(req.params.id) };
    res.json(articles[idx]);
  } else {
    res.status(404).json({ error: 'Article not found' });
  }
});

// Delete article
app.delete('/articles/:id', (req, res) => {
  const idx = articles.findIndex(a => a.id === Number(req.params.id));
  if (idx !== -1) {
    articles.splice(idx, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ error: 'Article not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});