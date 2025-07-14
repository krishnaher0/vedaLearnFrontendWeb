import React, { useState } from "react";
import { useGetQuestionByLessonIndex } from "../../hooks/admin/useAdminQuestion";
import { useUpdateProgress, useCompleteLesson } from "../../hooks/useProgressUser";

export default function UserLessonQuestion({ lessonId, userId,courseId,questionIndex, totalQuestions, onNext }) {
    console.log(" lessonId:", lessonId);
console.log(" questionIndex:", questionIndex);

  const { data, isLoading, error } = useGetQuestionByLessonIndex(lessonId, questionIndex);

  console.log("✅ Hook data:", data);
  

  const updateProgressMutation = useUpdateProgress();
  const completeLessonMutation = useCompleteLesson();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const [answered, setAnswered] = useState(false);

  // ✅ FIRST: check loading, error, or no data
  if (isLoading) return <div className="text-gray-500">Loading question...</div>;
  if (error) return <div className="text-red-500">Failed to load question</div>;
  if (!data || !data.question) return <div className="text-gray-400">No question available</div>;

  // ✅ Only now it's safe to access
  const question = data.question;
const handleChoiceClick = (choice) => {
  if (!answered) {
    setSelectedChoice(choice);
    setAnswered(true);

    const storedUser = localStorage.getItem("user");
    let effectiveUserId = userId;
    if (!effectiveUserId && storedUser) {
      try {
        effectiveUserId = JSON.parse(storedUser)?._id;
      } catch {
        console.error("Failed to parse user");
      }
    }

    if (!effectiveUserId) {
      console.error("userId is missing, cannot update progress");
      return;
    }

     const progressData = {
      userId: effectiveUserId,
      courseId,
      lessonId,
      questionId: question._id,
      userAnswer: choice,
      isCorrect: choice === question.correctAnswer,
    };

    console.log("Sending updateProgress:", { userId: effectiveUserId, progressData });
    

    updateProgressMutation.mutate({ userId: effectiveUserId, progressData });

    if (questionIndex === totalQuestions) {
      completeLessonMutation.mutate(effectiveUserId);
    }

    setTimeout(() => {
      setSelectedChoice(null);
      setAnswered(false);
      onNext();
    }, 1000);
  }
};



  return (
    <div className="p-6 rounded-xl bg-white shadow-lg max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">{`Q${data.questionIndex}: ${question.question}`}</h2>

      {question.audioUrl && (
        <audio controls src={`http://localhost:3001${question.audioUrl}`} className="w-full" />
      )}

      <div className="grid grid-cols-2 gap-4">
        {question.choices.map((choice, idx) => {
          const isCorrect = answered && choice === question.correctAnswer;
          const isWrong = answered && choice === selectedChoice && choice !== question.correctAnswer;

          const baseStyle = "p-4 border rounded-lg cursor-pointer text-center font-medium transition";
          const normal = "border-gray-300 hover:bg-gray-100";
          const correct = "border-green-500 bg-green-100 text-green-700";
          const wrong = "border-red-500 bg-red-100 text-red-700";

          return (
            <div
              key={idx}
              className={`${baseStyle} ${
                isCorrect ? correct : isWrong ? wrong : normal
              }`}
              onClick={() => handleChoiceClick(choice)}
            >
              {choice}
            </div>
          );
        })}
      </div>

      {answered && (
        <div className="text-sm text-gray-600 text-center pt-2">
          {selectedChoice === question.correctAnswer ? "✅ Correct!" : "❌ Incorrect"}
        </div>
      )}
    </div>
  );
}
