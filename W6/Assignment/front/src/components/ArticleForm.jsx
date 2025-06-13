import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById, createArticle, updateArticle } from "../services/api";

export default function ArticleForm({ isEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Initialize with default empty values to prevent undefined
  const initialFormData = {
    title: "",
    content: "",
    journalist_id: "",
    category_id: "", // Updated to match database schema
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      fetchArticle(id);
    }
  }, [isEdit, id]); // Add dependencies to useEffect

  const fetchArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const article = await getArticleById(id);
      // Ensure all form fields have at least an empty string
      setFormData({
        ...initialFormData,
        ...article,
        category_id: article.category_id || article.category || "", // Handle both old and new field names
      });
    } catch (err) {
      setError("Failed to load article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value || "" // Ensure the value is never undefined
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const dataToSubmit = {
        ...formData,
        category_id: formData.category_id || formData.category, // Handle both old and new field names
      };
      
      if (isEdit) {
        await updateArticle(id, dataToSubmit);
      } else {
        await createArticle(dataToSubmit);
      }
      navigate("/articles");
    } catch (err) {
      setError("Failed to submit article.");
      // Don't reset the form on error
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
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <br />
        <textarea
          name="content"
          value={formData.content || ""}
          onChange={handleChange}
          placeholder="Content"
          required
        />
        <br />
        <input
          name="journalist_id"
          value={formData.journalist_id || ""}
          onChange={handleChange}
          placeholder="Journalist ID"
          required
        />
        <br />
        <input
          name="category_id"
          value={formData.category_id || formData.category || ""}
          onChange={handleChange}
          placeholder="Category ID"
          required
        />
        <br />
        <button className="main" type="submit">
          {isEdit ? "Edit" : "Create"}
        </button>
      </form>
    </>
  );
}
