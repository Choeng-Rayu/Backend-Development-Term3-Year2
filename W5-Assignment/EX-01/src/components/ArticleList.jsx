import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:3000/articles");
      // Ensure the response is always an array
      setArticles(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setArticles([]); // fallback to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/articles/${id}`);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (err) {
      console.error("Error deleting article:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          📄 View Articles
        </Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>
              By Journalist #{article.journalistId} | Category #
              {article.categoryId}
            </small>
            <br />
            <button onClick={() => deleteArticle(article.id)}>Delete</button>
            <button onClick={() => navigate(`/update/${article.id}`)}>
              Update
            </button>
            <button onClick={() => navigate(`/articles/${article.id}`)}>
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
