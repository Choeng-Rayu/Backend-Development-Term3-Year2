import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleWithJournalistById, getArticlesByCategoryId } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      fetchRelatedArticles();
    }
    // eslint-disable-next-line
  }, [selectedCategories]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      // Use the new API to get article with journalist name
      const found = await getArticleWithJournalistById(id);
      if (found) {
        setArticle(found);
        setError("");
        // Assuming categories are fetched as an array and you want the first one
        setSelectedCategories(found.categories && found.categories.length > 0 ? [found.categories[0].id] : []);
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

  const fetchRelatedArticles = async () => {
    try {
      setLoading(true);
      // Fetch articles by the first selected category
      const data = await getArticlesByCategoryId(selectedCategories[0]);
      setRelatedArticles(data);
    } catch (err) {
      setError("Failed to fetch related articles.");
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

      {relatedArticles.length > 0 && (
        <div>
          <h3>Related Articles</h3>
          <ul>
            {relatedArticles.map((relatedArticle) => (
              <li key={relatedArticle.id}>
                <Link to={`/articles/${relatedArticle.id}`}>
                  {relatedArticle.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
