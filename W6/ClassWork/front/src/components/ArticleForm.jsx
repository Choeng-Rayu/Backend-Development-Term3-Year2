import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById, createArticle, updateArticle } from "../services/api";

export default function ArticleForm({ isEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    journalist: "",
    category: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      fetchArticle(id);
    }
  }, []);

  const fetchArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const article = await getArticleById(id);
      setFormData(article);
    } catch (err) {
      setError("Failed to load article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isEdit) {
        await updateArticle(id, formData);
      } else {
        await createArticle(formData);
      }
      navigate("/articles");
    } catch (err) {
      setError("Failed to submit article.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="article-form" onSubmit={handleSubmit}>
        <h2>{isEdit ? "Edit Article" : "Create Article"}</h2>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <br />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          required
        />
        <br />
        <input
          name="journalist"
          value={formData.journalist}
          onChange={handleChange}
          placeholder="Journalist ID"
          required
        />
        <br />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category ID"
          required
        />
        <br />
        <button className="main" type="submit">
          {isEdit ? "Edit " : "Create"}
        </button>
      </form>
    </>
  );
}
