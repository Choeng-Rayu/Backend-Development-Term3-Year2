import { Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticleDetails from "./ArticleDetails";
import ArticleForm from "./ArticleForm";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📰 News Article Management</h1>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
        <Route path="/add" element={<ArticleForm />} />
        <Route path="/edit/:id" element={<ArticleForm />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}
