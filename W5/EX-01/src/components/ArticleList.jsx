import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import Article from './Article';


export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  // Fetch all articles when component mounts
  axios.get('http://localhost:5000/articles/') 
    .then(res => setArticles(res.data)) 
    .catch(err => console.error(err));
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    axios.get(`http://localhost:5000/articles/${id}`) 
      .then(res => {
        setArticles(articles.filter(a => a.id === id))
      }) 
      .catch(err => console.error(err));
  };

  const deleteArticle = async (id) => {
    // Delete an article by ID
    axios.delete(`http://localhost:5000/articles/${id}`) 
      .then(() => {
        setArticles(articles.filter(article => article.id === id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button onClick={() => deleteArticle(article.id)}>Delete</button>
            <button onClick={() => {
              // Navigate to update article form with article ID /articles/update/${article.id}
            }}>Update</button>
            <button onClick={() => {
              // Navigate to view article details with article ID /articles/${article.id}
            }}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}