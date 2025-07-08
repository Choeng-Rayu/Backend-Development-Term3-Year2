import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    API.get("/auth/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        setError("Unauthorized or error fetching users");
        console.error(err);
        navigate("/login");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="py-2">
              {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
