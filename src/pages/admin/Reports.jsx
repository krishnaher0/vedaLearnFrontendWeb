import React from "react";

export default function Reports() {
  const course = {
    title: "Sanskrit",
    description: "It is a historic language especially with high vedic knowledge",
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>

        <div className="flex flex-wrap gap-2">
        
          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
            Edit
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
