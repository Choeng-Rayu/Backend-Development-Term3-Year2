import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState("");

  // Fetch all articles and journalists when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
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

  const fetchJournalists = async () => {
    try {
      const res = await axios.get("http://localhost:5000/journalists");
      setJournalists(res.data);
    } catch (err) {
      setJournalists([]);
      console.error("Error fetching journalists:", err);
    }
  };

  const handleApplyFilters = () => {
    if (selectedJournalist) {
      setArticles(
        allArticles.filter(
          (article) => String(article.journalistId) === selectedJournalist
        )
      );
    } else {
      setArticles(allArticles);
    }
  };

  const handleResetFilters = () => {
    setSelectedJournalist("");
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
