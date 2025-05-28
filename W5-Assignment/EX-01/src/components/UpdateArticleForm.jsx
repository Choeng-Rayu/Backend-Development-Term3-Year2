import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    journalistId: "",
    categoryId: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/articles/${id}`);
        setForm({
          title: res.data.title || "",
          content: res.data.content || "",
          journalistId: res.data.journalistId || "",
          categoryId: res.data.categoryId || "",
        });
      } catch (err) {
        alert("Error fetching article.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/articles/${id}`, form);
      navigate("/");
    } catch (err) {
      alert("Error updating article.");
      console.error(err);
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
      <form onSubmit={handleSubmit}>
        <h3>Update Article</h3>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <br />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          required
        />
        <br />
        <input
          name="journalistId"
          value={form.journalistId}
          onChange={handleChange}
          placeholder="Journalist ID"
          required
        />
        <br />
        <input
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          placeholder="Category ID"
          required
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
