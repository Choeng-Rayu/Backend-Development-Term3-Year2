import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/articles/${id}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <Link to="/">Back</Link>
    </div>
  );
}