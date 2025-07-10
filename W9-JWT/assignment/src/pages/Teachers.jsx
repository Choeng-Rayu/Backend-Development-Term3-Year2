import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api";

export default function Teachers() {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      const page = searchParams.get("page") || 1;
      const limit = searchParams.get("limit") || 10;

      try {
        const res = await API.get(`/teachers?page=${page}&limit=${limit}`);
        setData(res.data.data);
        setMeta(res.data.meta);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
      }
    };

    fetchTeachers();
  }, [searchParams]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teachers</h1>

      <div className="space-y-4">
        {data.map((teacher) => (
          <div key={teacher.id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-semibold text-gray-800">
              {teacher.name}
            </h2>
            <p className="text-sm text-gray-600">
              Department: {teacher.department || "N/A"}
            </p>
            <p className="text-sm text-gray-700">
              Assigned Courses: {teacher.CourseID?.length || 0}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          disabled={meta.page <= 1}
          onClick={() =>
            setSearchParams({ page: Number(meta.page) - 1, limit: 10 })
          }
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={meta.page >= meta.totalPages}
          onClick={() =>
            setSearchParams({ page: Number(meta.page) + 1, limit: 10 })
          }
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
