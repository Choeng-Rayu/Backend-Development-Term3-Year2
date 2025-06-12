import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    journalist_id: "",
    category: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/articles/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:5000/articles/${id}`, formData)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost:5000/articles', formData)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit' : 'Add'} Article</h2>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      /><br />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Content"
        required
      /><br />
      <input
        name="journalist_id"
        value={formData.journalist_id}
        onChange={handleChange}
        placeholder="Journalist ID"
        required
      /><br />
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category ID"
        required
      /><br />
      <button type="submit">{id ? 'Update' : 'Add'}</button>
    </form>
  );
}