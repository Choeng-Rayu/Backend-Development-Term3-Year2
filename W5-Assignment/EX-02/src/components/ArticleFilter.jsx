import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch all articles, journalists, and categories when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Example: fetch articles from your API or data-ex2.js if needed
    // const res = await axios.get('http://localhost:5000/articles');
    // setArticles(res.data);
    const res = await axios.get("http://localhost:5000/articles");
    setArticles(Array.isArray(res.data) ? res.data : []);
    setAllArticles(Array.isArray(res.data) ? res.data : []);
  };

  const fetchJournalists = async () => {
    try {
      const res = await axios.get("http://localhost:5000/journalists");
      setJournalists(res.data);
    } catch (err) {
      console.error("Error fetching journalists:", err);
      setJournalists([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  const handleApplyFilters = () => {
    let filtered = allArticles;
    if (selectedJournalist) {
      filtered = filtered.filter(
        (article) => String(article.journalistId) === selectedJournalist
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(
        (article) => String(article.categoryId) === selectedCategory
      );
    }
    setArticles(filtered);
  };

  const handleResetFilters = () => {
    setSelectedJournalist("");
    setSelectedCategory("");
    setArticles(allArticles);
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select
          id="journalistFilter"
          value={selectedJournalist}
          onChange={(e) => setSelectedJournalist(e.target.value)}
        >
          <option value="">All Journalists</option>
          {journalists.map((j) => (
            <option key={j.id} value={j.id}>
              {j.name}
            </option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
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
