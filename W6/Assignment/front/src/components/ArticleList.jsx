// ArticleList.jsx
// This component displays a list of articles, allows filtering by category, and shows journalist/category names.
// It fetches articles and categories from the backend and updates the list when filters change.

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getArticlesWithJournalist,
  getCategories,
  getArticlesByCategoryId,
  removeArticle,
} from "../services/api";

//
// ArticleList component
//
export default function ArticleList() {
  // State for articles, loading, error, categories, and selected categories
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const navigate = useNavigate();

  // Fetch categories on mount
  // Ensure categories is always an array (fixes categories.map error)
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch articles when selectedCategories changes
  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line
  }, [selectedCategories]);

  // Fetches categories from the backend
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      // Ensure we have valid category data with unique IDs
      const validCategories = Array.isArray(data)
        ? data.filter(
            (cat) =>
              cat && // ensure category exists
              (cat.id || cat.id === 0) && // ensure it has an id (including 0)
              cat.name // ensure it has a name
          )
        : [];

      // Remove any duplicates by ID
      const uniqueCategories = validCategories.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  // Fetches articles, filtered by category if selected
  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      let data;
      if (selectedCategories.length === 0) {
        data = await getArticlesWithJournalist();
      } else {
        // Fetch articles for the first selected category (for simplicity, can be extended for multiple)
        // For multiple, you would need a backend endpoint that supports multiple category IDs
        data = await getArticlesByCategoryId(selectedCategories[0]);
      }
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Deletes an article and refreshes the list
  const deleteArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      await removeArticle(id);
      await fetchArticles(); // refresh the list
    } catch (err) {
      setError("Failed to delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  // Navigation handlers
  const handleView = (id) => navigate(`/articles/${id}`);
  const handleEdit = (id) => navigate(`/articles/${id}/edit`);

  // Handles category filter change
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories(value ? [value] : []);
  };

  return (
    <>
      {/* Category filter dropdown */}
      <div style={{ marginBottom: 16 }}>
        <label>Filter by Category: </label>
        <select
          onChange={handleCategoryChange}
          value={selectedCategories[0] || ""}
        >
          <option key="all" value="">
            All
          </option>
          {categories.map((cat) => (
            <option key={`cat-${cat.id}`} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={deleteArticle}
          />
        ))}
      </div>
    </>
  );
}

// ArticleCard displays a single article's info, including journalist and category names
function ArticleCard({ article, onView, onEdit, onDelete }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author"> By 
        {article.journalist_name ? (
          <Link to={`/journalists/${article.journalist_id}/articles`}>
            {article.journalist_name}
          </Link>
        ) : (
          article.journalist
        )}
        {/* By {article.journalist_name || article.journalist} */}
      </div>
      <div className="article-category">
        Category: {article.category_name || article.category}
      </div>
      <div className="article-actions">
        <button className="button-tertiary" onClick={() => onEdit(article.id)}>
          Edit
        </button>
        <button
          className="button-tertiary"
          onClick={() => onDelete(article.id)}
        >
          Delete
        </button>
        <button className="button-secondary" onClick={() => onView(article.id)}>
          View
        </button>
      </div>
    </div>
  );
}
