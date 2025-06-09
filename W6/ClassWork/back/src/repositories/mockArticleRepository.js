let articles = [
  {
    id: "1",
    title: "React Basics",
    content: "Learn React",
    journalist: "Alice",
    category: "Frontend",
  },
  {
    id: "2",
    title: "Routing",
    content: "React Router",
    journalist: "Bob",
    category: "Frontend",
  },
];

// Helper to simulate async delay (optional)
function delay(ms = 100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get all articles
export async function getArticles() {
  await delay();
  return articles;
}

// Get one article by ID
export async function getArticleById(id) {
  await delay();
  return articles.find((a) => a.id === id) || null;
}

// Create a new article
export async function createArticle(article) {
  await delay();
  const newArticle = { ...article, id: String(Date.now()) };
  articles.push(newArticle);
  return newArticle;
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
  await delay();
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) return null;

  articles[index] = { ...articles[index], ...updatedData };
  return articles[index];
}

// Delete an article by ID
export async function deleteArticle(id) {
  await delay();
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) return false;

  articles.splice(index, 1);
  return true;
}
