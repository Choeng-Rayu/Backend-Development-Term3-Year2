import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/articles/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:5000/articles/${id}`, form)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost:5000/articles', form)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit' : 'Add'} Article</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      /><br />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        required
      /><br />
      <input
        name="journalistId"
        value={form.journalistId}
        onChange={handleChange}
        placeholder="Journalist ID"
        required
      /><br />
      <input
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        placeholder="Category ID"
        required
      /><br />
      <button type="submit">{id ? 'Update' : 'Add'}</button>
    </form>
  );
}