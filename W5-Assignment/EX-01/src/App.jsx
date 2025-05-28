import { Routes, Route, Link } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import CreateArticleForm from './components/CreateArticleForm';
import UpdateArticleForm from './components/UpdateArticleForm';
import ArticleViewer from './components/ArticleViewer';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>📰 News Article Management</h1>

  
      {/* Routes */}
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/add" element={<CreateArticleForm />} />
        <Route path="/update/:id" element={<UpdateArticleForm />} />
        <Route path="/articles/:id" element={<ArticleViewer />} />
      </Routes>
    </div>
  );
}

export default App;
