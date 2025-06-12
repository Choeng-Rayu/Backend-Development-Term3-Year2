import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleWithJournalistById } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      // Use the new API to get article with journalist name
      const found = await getArticleWithJournalistById(id);
      if (found) {
        setArticle(found);
        setError("");
      } else {
        setArticle(null);
        setError("Article not found.");
      }
    } catch (err) {
      setError("Failed to fetch article.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div>
        <strong>Journalist:</strong> {article.journalist_name ? (
          <Link to={`/journalists/${article.journalist_id}/articles`}>
            {article.journalist_name}
          </Link>
        ) : (
          article.journalist
        )}
      </div>
      <div>
        <strong>Category:</strong> {article.category}
      </div>
    </div>
  );
}
