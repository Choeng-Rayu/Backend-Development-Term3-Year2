import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });
  const navigate = useNavigate();


  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    const fetchArticle = async () => {
      try{
        const response = await axios.get(`http://localhost:3000/articles/${useParams().id}`); 
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    try {
      await axios.put('http://localhost:3000/api/articles/${id}', form);
      navigate('/'); // Redirect to article list after successful update
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
    </form>
  );
}
