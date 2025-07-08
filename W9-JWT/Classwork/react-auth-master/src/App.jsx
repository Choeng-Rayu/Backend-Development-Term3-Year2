import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4 flex justify-center space-x-4">
        <Link to="/login" className="text-white hover:underline">
          Login
        </Link>
        <Link to="/register" className="text-white hover:underline">
          Register
        </Link>
        <Link to="/users" className="text-white hover:underline">
          Users
        </Link>
        <button
          className=" text-white hover:underline font-semibold transition"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<User />} /> {/* ✅ Protected page */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
