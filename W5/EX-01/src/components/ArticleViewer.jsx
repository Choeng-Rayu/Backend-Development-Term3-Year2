// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// export default function ArticlePage() {
//   const { id } = useParams();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Function to fetch article by ID
//     axios.get(`http://localhost:5000/articles/${id}`)
//       .then(response => {
//         setArticle(response.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to load article');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading article...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!article) return <div>No article found.</div>;

//   return (
//     <div>
//       <h2>{article.title}</h2>
//       <p>{article.content}</p>
//       <div>
//         <strong>Journalist ID:</strong> {article.journalistId}
//       </div>
//       <div>
//         <strong>Category ID:</strong> {article.categoryId}
//       </div>
//     </div>
//   );
// }


import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleViewer() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/articles/${id}`)
      .then(response => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load article');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;
  if (article && article.error) return <div>{article.error}</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div>
        <strong>Journalist ID:</strong> {article.journalistId}
      </div>
      <div>
        <strong>Category ID:</strong> {article.categoryId}
      </div>
    </div>
  );
}