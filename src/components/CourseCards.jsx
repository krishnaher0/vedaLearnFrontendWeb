// src/components/CourseCards.jsx
import React from "react";
export default function CourseCards({ courses, onEdit, onDelete, onViewLessons }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center shadow-2xl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-lg text-white">No courses found</p>
          <p className="text-sm text-white">Create your first course to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course._id}
          onClick={() => onViewLessons(course._id)}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer group overflow-hidden min-h-[250px]"
        >
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Flag in Top-Right */}
          <div className="absolute top-4 right-4 z-10">
            {course.flagPath ? (
              <img
                src={`http://localhost:3001/${course.flagPath}`}
                alt={`${course.language} Flag`}
                className="w-16 h-10 object-cover rounded-lg shadow-lg border border-white/20"
              />
            ) : (
              <div className="w-16 h-10 bg-white/10 border border-white/20 flex items-center justify-center text-xs text-white rounded-lg">
                No Flag
              </div>
            )}
          </div>

          <div className="relative z-10 pr-20">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
              {course.language}
            </h3>
            <p className="text-white text-sm mb-4 line-clamp-3 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="relative z-10 mt-auto flex space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(course);
              }}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 flex items-center justify-center gap-2"
            >
              <span>✏️</span>
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(course._id);
              }}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2"
            >
              <span>🗑</span>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}