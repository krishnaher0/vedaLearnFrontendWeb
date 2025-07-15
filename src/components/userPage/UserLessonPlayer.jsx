import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserLessonQuestion from "./UserLessonQuestion";
import { useUserProgress } from "../../hooks/useProgressUser";
import { AuthContext } from "../../auth/AuthProvider";
import Header from "./Header";

export default function UserLessonPlayer({ userId: propUserId, totalQuestions }) {
  const { user } = useContext(AuthContext);
  const finalUserId = propUserId || user?._id;

  console.log("✅ finalUserId", finalUserId);

  const { lessonId, courseId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(1);

  const { data,refetch, isLoading, isError } = useUserProgress(finalUserId);

  console.log("✅ Progress data", data);

  const handleNext = () => {
    if (currentIndex < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 1) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (!lessonId) {
    return <div className="text-center text-red-500 mt-10">Invalid lesson ID in URL.</div>;
  }

  return (
<div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-4 py-8 bg-gradient-to-br from-green-400 via-blue-500 to-indigo-600">
  <Header/>


      {/* ✅ User stats section */}
      <div className="flex justify-between gap-6 w-full max-w-2xl bg-[#1e293b] border border-gray-600 p-4 rounded-xl">
        {isLoading ? (
          <div className="text-gray-400 text-sm">Loading stats...</div>
        ) : isError ? (
          <div className="text-red-500 text-sm">Error loading stats</div>
        ) : (
          <>
            <div className="flex items-center gap-1 text-red-500 font-bold">
              ❤️ <span className="text-sm">{data?.hearts ?? 0}</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-400 font-bold">
              ⭐ <span className="text-sm">{data?.xp ?? 0} XP</span>
            </div>
            <div className="flex items-center gap-1 text-orange-500 font-bold">
              🔥 <span className="text-sm">{data?.dayStreak ?? 0}</span>
            </div>
          </>
        )}
      </div>

      <UserLessonQuestion
        lessonId={lessonId}
        courseId={courseId}
        userId={finalUserId}
        questionIndex={currentIndex}
        totalQuestions={totalQuestions}
        onNext={handleNext}
        refetchProgress={refetch} 
      />

      <div className="flex gap-4 mt-4">
        <button
          disabled={currentIndex <= 1}
          onClick={() => setCurrentIndex((prev) => prev - 1)}

          className={`px-4 py-2 rounded-lg border border-gray-600 transition ${
            currentIndex <= 1
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
          }`}
        >
          Previous
        </button>

        <button
          disabled={currentIndex >= totalQuestions}
          onClick={() => setCurrentIndex((prev) => prev + 1)}

          className={`px-4 py-2 rounded-lg border border-gray-600 transition ${
            currentIndex >= totalQuestions
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
