// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function UserLessonPlayer() {
//   const { lessonId, userId } = useParams(); // passed from route
//   const [questions, setQuestions] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   useEffect(() => {
//     fetch(`http://localhost:3001/api/admin/questions/lesson/${lessonId}`)
//       .then((res) => res.json())
//       .then((data) => setQuestions(data.data))
//       .catch((err) => console.error("Error:", err));
//   }, [lessonId]);

//   const current = questions[index];

//   const handleAnswerSubmit = async () => {
//     if (!current) return;

//     const isCorrect = current.correctAnswer?.trim().toLowerCase() === userAnswer.trim().toLowerCase();

//     setFeedback(isCorrect ? "✅ Correct!" : "❌ Incorrect");
//     setIsSubmitted(true);

//     // Save progress
//     await fetch(`/api/users/${userId}/progress`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         questionId: current._id,
//         isCorrect,
//         userAnswer,
//         lessonId,
//       }),
//     });
//   };

//   const handleNext = () => {
//     setIndex((prev) => prev + 1);
//     setUserAnswer("");
//     setFeedback("");
//     setIsSubmitted(false);
//   };

//   if (!current) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
//       <h2 className="text-xl font-semibold mb-4">Question {index + 1} of {questions.length}</h2>

//       {current.prompt && (
//         <p className="text-gray-600 italic mb-2">Prompt: {current.prompt}</p>
//       )}

//       {current.question && (
//         <p className="font-medium mb-3">{current.question}</p>
//       )}

//       {current.audioUrl && (
//         <audio controls className="mb-3 w-full">
//           <source src={`http://localhost:3001${current.audioUrl}`} type="audio/mpeg" />
//         </audio>
//       )}

//       {current.choices && (
//         <ul className="space-y-1 mb-4">
//           {current.choices.map((c, i) => (
//             <li key={i} className="text-gray-800">
//               {i + 1}. {c}
//             </li>
//           ))}
//         </ul>
//       )}

//       <input
//         type="text"
//         value={userAnswer}
//         onChange={(e) => setUserAnswer(e.target.value)}
//         placeholder="Enter your answer..."
//         className="w-full border px-3 py-2 rounded mb-2"
//         disabled={isSubmitted}
//       />

//       {feedback && <p className="mb-2 font-medium">{feedback}</p>}

//       {!isSubmitted ? (
//         <button
//           onClick={handleAnswerSubmit}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Submit
//         </button>
//       ) : (
//         <button
//           onClick={handleNext}
//           disabled={index === questions.length - 1}
//           className="bg-green-600 text-white px-4 py-2 rounded mt-3"
//         >
//           {index === questions.length - 1 ? "Finish Lesson" : "Next Question"}
//         </button>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetQuestionsByLesson } from "../../hooks/admin/useAdminQuestion";
import { toast } from "react-hot-toast";

export default function LessonQuestionPlayer() {
  const { lessonId,courseId } = useParams();
  const navigate = useNavigate();

  const { data: questions = [], isLoading, isError } = useGetQuestionsByLesson(lessonId);
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const current = questions[index];

  const handleSubmit = async () => {
    if (!current) return;

    const isCorrect = current.correctAnswer?.trim().toLowerCase() === userAnswer.trim().toLowerCase();
    setFeedback(isCorrect ? "✅ Correct!" : "❌ Incorrect");
    setIsSubmitted(true);

    // Save progress to backend
    await fetch(`/api/users/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        questionId: current._id,
        isCorrect,
        userAnswer,
        lessonId,
      }),
    });
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
      setUserAnswer("");
      setFeedback("");
      setIsSubmitted(false);
    } else {
      toast.success("🎉 You completed all questions!");
      navigate(-1); // Or redirect to summary
    }
  };

  if (isLoading) return <p>Loading questions...</p>;
  if (isError) return <p className="text-red-600">Failed to load questions.</p>;
  if (!current) return <p>No questions found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Question {index + 1} of {questions.length}</h2>
      <p className="mb-4">{current.prompt || current.question}</p>

      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        disabled={isSubmitted}
        className="border p-2 w-full mb-4"
        placeholder="Type your answer"
      />

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      ) : (
        <>
          <p className="mt-4">{feedback}</p>
          <button
            onClick={handleNext}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            {index < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </>
      )}
    </div>
  );
}
