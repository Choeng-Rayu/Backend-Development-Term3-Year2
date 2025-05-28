import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function CreateArticleForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    journalistId: "",
    categoryId: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    if (
      !form.title ||
      !form.content ||
      !form.journalistId ||
      !form.categoryId
    ) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:3000/articles", form);
      navigate("/"); // Redirect to article list after successful submission
    } catch (err) {
      console.error(err);
      alert("Error adding article. Please try again.");
    }
  };

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
      <form onSubmit={handleSubmit}>
        <h3>Add New Article</h3>
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
