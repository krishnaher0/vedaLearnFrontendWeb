// src/pages/LessonDetailsPage.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { useGetLessonById, useGetQuestionsByLesson, useCreateQuestion, useUpdateQuestion, useDeleteQuestion } from '../../hooks/useQuestionHooks';
// import QuestionForm from '../components/QuestionForm'; // New dynamic component for Question CRUD

export default function LessonDetailsPage() {
  const { lessonId } = useParams();
  // const { data: lesson, isLoading: lessonLoading } = useGetLessonById(lessonId);
  // const { data: questions = [], isLoading: questionsLoading } = useGetQuestionsByLesson(lessonId);

  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleAddQuestion = () => { /* ... */ };
  const handleEditQuestion = (question) => { /* ... */ };
  const handleDeleteQuestion = (questionId) => { /* ... */ };
  const handleSaveQuestion = (formData) => { /* ... */ };
  const handleCancelQuestion = () => { /* ... */ };

  // if (lessonLoading || questionsLoading) return <div className="text-center py-4">Loading...</div>;
  // if (!lesson) return <div className="text-red-500 text-center py-4">Lesson not found.</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Question Form Modal (dynamic based on question type) */}
      {showQuestionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto p-6 overflow-y-auto max-h-[90vh]">
            {/* <QuestionForm question={selectedQuestion} lessonId={lessonId} onCancel={handleCancelQuestion} onSave={handleSaveQuestion} /> */}
          </div>
        </div>
      )}

      {/* Lesson Header */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        {/* <Link to={`/admin/courses/${lesson.course._id}`} className="text-blue-600 hover:underline mb-2 block">&larr; Back to Course</Link> */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Lesson {/* lesson.lessonNo */}: {/* lesson.title */}</h2>
        <p className="text-gray-600">Level: {/* lesson.level */}</p>
        <p className="text-gray-600">Course: {/* lesson.course.language */}</p> {/* Populated course name */}
      </div>

      {/* Questions Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Questions</h3>
          <button onClick={handleAddQuestion} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition">
            + Add Question
          </button>
        </div>
        <div className="space-y-4"> {/* Use space-y for vertical spacing between question cards */}
          {/* {questions.map((question) => ( */}
            <div key={/* question._id */} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Type: {/* question.questionType */}</p>
              {/* Conditional rendering for question details based on type */}
              {/* {question.questionType === 'Translation' && (
                <>
                  <p><strong>Source:</strong> {question.sourceText}</p>
                  <p><strong>Target:</strong> {question.targetText}</p>
                </>
              )}
              {question.questionType === 'MultipleChoice' && (
                <>
                  <p><strong>Question:</strong> {question.questionText}</p>
                  <ul className="list-disc list-inside ml-4 mt-2">
                    {question.options.map((option, idx) => (
                      <li key={idx} className={idx === question.correctAnswerIndex ? 'font-bold text-green-600' : ''}>
                        {option} {idx === question.correctAnswerIndex && '(Correct)'}
                      </li>
                    ))}
                  </ul>
                </>
              )} */}
              <div className="mt-3 flex space-x-2 justify-end">
                <button onClick={() => handleEditQuestion(/* question */)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition">Edit</button>
                <button onClick={() => handleDeleteQuestion(/* question._id */)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition">Delete</button>
              </div>
            </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}