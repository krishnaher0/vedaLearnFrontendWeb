import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import { useEnrollCourse } from "../../hooks/useProgressUser"; // Your mutation hook
import { toast } from "react-toastify";

export default function UserCourseCard({ course }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log("user", user);
  console.log("course", course);

  // Hook must be called here, not inside handleStartLearning
  const enrollMutation = useEnrollCourse();

  const handleStartLearning = () => {
    if (!user) {
      toast.error("You must be logged in to enroll");
      navigate("/login");
      return;
    }
    const isAlreadyEnrolled = user.enrolledCourses?.includes(course._id);

    if (isAlreadyEnrolled) {
      navigate(`/user/courses/${course._id}/lessons`);
      return;
    }

    enrollMutation.mutate(
      { userId: user._id, courseId: course._id },
      {
        onSuccess: () => {
          navigate(`/user/courses/${course._id}/lessons`);
        },
        onError: () => {
          toast.error("Failed to enroll in course. Please try again.");
        },
      }
    );
  };

  return (
    <div className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-3xl shadow-lg border border-gray-200 p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {course.flagPath ? (
        <img
          src={`http://localhost:3001/${course.flagPath}`}
          alt={`${course.language} Flag`}
          className="absolute top-4 right-4 w-16 h-10 object-cover "
        />
      ) : (
        <div className="absolute top-5 right-5 w-14 h-9 bg-gray-200 flex items-center justify-center text-gray-400 rounded shadow text-xs">
          No Flag No Flag
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-800 mb-2 pr-20 tracking-tight hover:text-green-600 transition-colors duration-300">
        {course.language}
      </h3>

      <p className="text-gray-500 text-base mb-4 line-clamp-3 pr-4 leading-relaxed">
        {course.description}
      </p>

      <button
        onClick={handleStartLearning}
        className="mt-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
        Start Learning
      </button>
    </div>
  );
}
