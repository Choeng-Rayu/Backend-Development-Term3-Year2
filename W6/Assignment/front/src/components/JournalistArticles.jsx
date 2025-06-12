// JournalistArticles.jsx
// This component displays all articles written by a specific journalist.
// It fetches articles from the backend using the journalist ID from the URL.

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesByJournalistId } from "../services/api";

export default function JournalistArticles() {
  // useParams gets the journalist ID from the URL
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch articles when the component mounts or the ID changes
  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line
  }, [id]);

  // Fetches articles for the given journalist ID
  const fetchArticles = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getArticlesByJournalistId(id);
      setArticles(data);
    } catch (err) {
      setError("Failed to fetch articles for this journalist.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!articles.length) return <div>No articles found for this journalist.</div>;

  return (
    <div>
      <h2>Articles by Journalist</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong>
            <div>{article.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
