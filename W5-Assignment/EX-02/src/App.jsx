import { Routes, Route, Link } from 'react-router-dom';
import ArticleFilter from './components/ArticleFilter';
import ArticleFilterByCategory from './components/ArticleFilterByCategory';
import ArticleFilterByJournalist from './components/ArticleFilterByJournalist';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>📰 News Article Filter</h1>
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <Link to="/filter-by-category">Article Filter by category</Link>
        <Link to="/filter-by-journalist">Article Filter by journalist</Link>
        <Link to="/">Article Filter</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<ArticleFilter />} />
        <Route path="/filter-by-category" element={<ArticleFilterByCategory />} />
        <Route path="/filter-by-journalist" element={<ArticleFilterByJournalist />} />
      </Routes>
    </div>
  );
}

export default App;
