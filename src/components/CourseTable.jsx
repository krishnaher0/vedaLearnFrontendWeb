// src/components/admin/CourseTable.jsx
import React from "react";

export default function CourseTable({ courses, onEdit, onDelete, onViewLessons }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Language</th>
            <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
            <th className="py-3 px-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Flag</th>
            <th className="py-3 px-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course, index) => (
            <tr
              key={course._id}
              onClick={() => onViewLessons(course._id)}
              className={`cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
            >
              <td className="py-3 px-5 whitespace-nowrap text-sm text-gray-800">{course.language}</td>
              <td className="py-3 px-5 text-sm text-gray-800 max-w-xs overflow-hidden text-ellipsis">{course.description}</td>
              <td className="py-3 px-5 text-center">
                {course.flagPath ? (
                  <img
                    src={`http://localhost:3001/${course.flagPath}`}
                    alt={`${course.language} flag`}
                    className="h-10 w-auto inline-block rounded shadow-md"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className="text-gray-400">No Flag</span>
                )}
              </td>
              <td className="py-3 px-5 text-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(course);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(course._id);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
