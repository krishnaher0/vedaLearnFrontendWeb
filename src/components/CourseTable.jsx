import React from "react";

export default function CourseTable({ courses, onEdit, onDelete, onViewLessons }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-white/10 backdrop-blur-sm">
            <tr>
              <th className="py-4 px-6 text-left text-xs font-bold text-white uppercase tracking-wider">
                Language
              </th>
              <th className="py-4 px-6 text-left text-xs font-bold text-white uppercase tracking-wider">
                Description
              </th>
              <th className="py-4 px-6 text-center text-xs font-bold text-white uppercase tracking-wider">
                Flag
              </th>
              <th className="py-4 px-6 text-center text-xs font-bold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course._id}
                onClick={() => onViewLessons(course._id)}
                className={`cursor-pointer transition-all duration-300 hover:bg-white/10 border-b border-white/5 group ${
                  index % 2 === 0 ? "bg-white/2" : "bg-white/5"
                }`}
              >
                <td className="py-4 px-6 font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                  {course.language}
                </td>
                <td
                  className="py-4 px-6 max-w-xs truncate text-white"
                  title={course.description}
                >
                  {course.description}
                </td>
                <td className="py-4 px-6 text-center">
                  {course.flagPath ? (
                    <img
                      src={`http://localhost:3001/${course.flagPath}`}
                      alt={`${course.language} flag`}
                      className="h-8 w-12 object-cover rounded-lg shadow-lg border border-white/20 inline-block"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="text-white italic">No Flag</span>
                  )}
                </td>
                <td className="py-4 px-6 text-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(course);
                    }}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold px-4 py-2 rounded-lg text-xs shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <span>✏️</span>
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(course._id);
                    }}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-4 py-2 rounded-lg text-xs shadow-lg hover:shadow-red-500/25 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <span>🗑</span>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>
                    <p className="text-lg text-white">No courses found</p>
                    <p className="text-sm text-white">Create your first course to get started</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
