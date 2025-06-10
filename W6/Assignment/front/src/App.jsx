import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";

import ArticleList from "./components/ArticleList";
import ArticleForm from "./components/ArticleForm";
import ArticlePage from "./components/ArticlePage";

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Article App</h1>
      </header>

      <nav>
       <NavLink to="/articles" end className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}> View Articles</NavLink>
       <NavLink to="/articles/add" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}> + Create Article</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/add" element={<ArticleForm isEdit={false} />} />
        <Route
          path="/articles/:id/edit"
          element={<ArticleForm isEdit={true} />}
        />
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
