import React, { useState } from "react";
import { useGetQuestionByLessonIndex } from "../../hooks/admin/useAdminQuestion";
import { useUpdateProgress, useCompleteLesson } from "../../hooks/useProgressUser";
import { Volume2 } from "lucide-react";

export default function UserLessonQuestion({ lessonId, userId, courseId, questionIndex, totalQuestions, onNext,refetchProgress, }) {
  
  const { data, isLoading, error } = useGetQuestionByLessonIndex(lessonId, questionIndex);
  const updateProgressMutation = useUpdateProgress();
  const completeLessonMutation = useCompleteLesson();

  const [selectedChoice, setSelectedChoice] = useState(null);
  const [answered, setAnswered] = useState(false);

  if (isLoading) return <div className="text-gray-400 text-center mt-10">Loading question...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Failed to load question</div>;
  if (!data || !data.question) return <div className="text-gray-400 text-center mt-10">No question available</div>;

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
        console.error("userId is missing");
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

     updateProgressMutation.mutate(
  { userId: effectiveUserId, progressData },
  {
    onSuccess: (data) => {
      console.log("✅ Progress updated", data);

      // Optionally refetch progress here
      if (refetchProgress) refetchProgress();

      // Optionally show a single toast
      // toast.success("Progress updated!");

      if (questionIndex === totalQuestions) {
        completeLessonMutation.mutate(effectiveUserId);
      }

      // Move to next question after delay
      setTimeout(() => {
        setSelectedChoice(null);
        setAnswered(false);
        onNext?.();
      }, 1200);
    },
    onError: (error) => {
      console.error("❌ Failed to update progress", error);
      toast.error("Failed to update progress");
    },
  }
);


      

      if (questionIndex === totalQuestions) {
        completeLessonMutation.mutate(effectiveUserId);
      }

      setTimeout(() => {
        setSelectedChoice(null);
        setAnswered(false);
        onNext?.();
      }, 1200);
    }
  };

  return (
    <div className="bg-[#0f172a] text-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full mx-auto space-y-6">
      <div className="flex justify-between items-center">
        
        <span className="text-sm text-gray-400">{`Question ${questionIndex} `}</span>
      </div>

      <h2 className="text-xl font-semibold">{question.question}</h2>

      {question.audioUrl && (
        <button
          onClick={() => {
            const audio = new Audio(`http://localhost:3001${question.audioUrl}`);
            audio.play();
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition"
        >
          <Volume2 className="w-5 h-5" />
          Play Audio
        </button>
      )}

      <div className="flex flex-col gap-3">
        {question.choices.map((choice, idx) => {
          const isCorrect = answered && choice === question.correctAnswer;
          const isWrong = answered && choice === selectedChoice && choice !== question.correctAnswer;

          const baseStyle = "p-3 rounded-lg border transition text-center cursor-pointer";
          const normal = "border-gray-600 bg-[#1e293b] hover:bg-[#334155]";
          const correct = "border-green-500 bg-green-700 text-white";
          const wrong = "border-red-500 bg-red-700 text-white";

          return (
            <div
              key={idx}
              className={`${baseStyle} ${isCorrect ? correct : isWrong ? wrong : normal}`}
              onClick={() => handleChoiceClick(choice)
                
              }
            >
              {choice}
            </div>
          );
        })}
      </div>

      {answered && (
        <div className="text-center text-sm mt-3">
          {selectedChoice === question.correctAnswer ? "✅ Correct!" : "❌ Incorrect"}
        </div>
      )}
    </div>
  );
}
