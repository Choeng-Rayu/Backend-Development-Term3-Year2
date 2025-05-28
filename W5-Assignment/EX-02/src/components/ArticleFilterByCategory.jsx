import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch all articles and categories when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/articles");
      setArticles(res.data);
      setAllArticles(res.data);
    } catch (err) {
      setArticles([]);
      setAllArticles([]);
      console.error("Error fetching articles:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categories");
      setCategories(res.data);
    } catch (err) {
      setCategories([]);
      console.error("Error fetching categories:", err);
    }
  };

  const handleApplyFilters = () => {
    if (selectedCategory) {
      setArticles(
        allArticles.filter(
          (article) => String(article.categoryId) === selectedCategory
        )
      );
    } else {
      setArticles(allArticles);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setArticles(allArticles);
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button onClick={handleApplyFilters}>Apply Filters</button>
        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>
              By Journalist #{article.journalistId} | Category #
              {article.categoryId}
            </small>
            <br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
