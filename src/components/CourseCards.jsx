// src/components/admin/CourseCards.jsx
import React from "react";

export default function CourseCards({ courses, onEdit, onDelete, onViewLessons }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course._id}
          onClick={() => onViewLessons(course._id)}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 flex flex-col justify-between transition hover:shadow-2xl"
        >
           {/* Flag in Top-Right */}
        {course.flagPath ? (
          <img
            src={`http://localhost:3001/${course.flagPath}`}
            alt={`${course.language} Flag`}
            className="absolute top-4 right-4 w-16 h-10 object-cover rounded shadow border"
          />
        ) : (
          <div className="absolute top-4 right-4 w-16 h-10 bg-gray-100 flex items-center justify-center text-xs text-gray-400 rounded border">
            No Flag
          </div>
        )}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.language}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{course.description}</p>
         

          <div className="mt-auto flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(course);
              }}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(course._id);
              }}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
