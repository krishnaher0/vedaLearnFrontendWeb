import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserCourseCard({ course }) {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate(`/user/courses/${course._id}/lessons`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 flex flex-col justify-between transition hover:shadow-2xl"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.language}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{course.description}</p>
      {course.flagPath ? (
        <a
          href={`http://localhost:3001/${course.flagPath}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline text-sm mb-4"
        >
          View Flag
        </a>
      ) : (
        <span className="text-gray-400 text-sm mb-4">No Flag</span>
      )}
      <button
        onClick={handleStartLearning}
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm mt-auto"
      >
        Start Learning
      </button>
    </div>
  );
}
