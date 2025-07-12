import QuestionCard from "../../components/QuestionCard";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetQuestionsByLesson,
  useDeleteQuestion,
  useUpdateQuestion,
  useCreateQuestion,
} from "../../hooks/admin/useAdminQuestion";
import { toast } from "react-hot-toast";
import DeleteModal from "../../components/DeleteModal";
import QuestionFormModal from "../../components/admin/QuestionFormModal";

export default function Question() {
  const { courseId, lessonId, lessonTitle } = useParams();
  const navigate = useNavigate();

  const {
    data: questions = [],
    isLoading,
    isError,
    refetch,
  } = useGetQuestionsByLesson(lessonId);
  const updateQuestionMutation = useUpdateQuestion();
  const createQuestionMutation = useCreateQuestion();
  const deleteMutation = useDeleteQuestion();

  const [selectedType, setSelectedType] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [questionIdToDelete, setQuestionIdToDelete] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    if (lessonId) {
      refetch();
    }
  }, [lessonId, refetch]);

  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    setShowQuestionForm(true);
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setShowQuestionForm(true);
  };

  const handleCancelQuestion = () => {
    setShowQuestionForm(false);
    setSelectedQuestion(null);
  };

  const handleSave = (formData) => {
    if (selectedQuestion) {
      updateQuestionMutation.mutate(
        { questionId: selectedQuestion._id, questionData: formData },
        {
          onSuccess: () => {
            toast.success("Question updated");
            setShowQuestionForm(false);
            setSelectedQuestion(null);
            refetch();
          },
          onError: () => {
            toast.error("Failed to update question");
          },
        }
      );
    } else {
      createQuestionMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Question added");
          setShowQuestionForm(false);
          refetch();
        },
        onError: () => {
          toast.error("Failed to add question");
        },
      });
    }
  };

  const openDeleteModal = (id) => {
    setQuestionIdToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!questionIdToDelete) return;
    try {
      await deleteMutation.mutateAsync(questionIdToDelete);
      toast.success("Question deleted");
      setDeleteModalOpen(false);
      setQuestionIdToDelete(null);
      refetch();
    } catch {
      toast.error("Failed to delete question");
    }
  };

  if (!lessonId)
    return <p className="text-gray-500">Select a lesson to view questions.</p>;
  if (isLoading) return <p>Loading questions...</p>;
  if (isError) return <p className="text-red-600">Failed to load questions.</p>;

  const filteredQuestions = selectedType
    ? questions.filter((q) => q.questionType === selectedType)
    : questions;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Question"
        description="Are you sure you want to delete this question? This action cannot be undone."
      />

      {showQuestionForm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto p-6 overflow-y-auto max-h-[90vh]">
            <QuestionFormModal
              onSave={handleSave}
              onCancel={handleCancelQuestion}
              initialData={selectedQuestion} // this will be null on add
              lessonId={lessonId}
            />

            <button
              onClick={handleCancelQuestion}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
              aria-label="Close">
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <h1 className="text-2xl font-semibold text-gray-800">
          Question Management
        </h1>
        <h2>{lessonTitle}</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddQuestion}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">
            + Add Question
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded transition">
            Back to Lessons
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="questionType" className="mr-2 font-medium">
          Filter by Question Type:
        </label>
        <select
          id="questionType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1">
          <option value="">All Types</option>
          {[...new Set(questions.map((q) => q.questionType))].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuestions.length === 0 && (
          <p className="text-gray-500">No questions found for this lesson.</p>
        )}
        {filteredQuestions.map((q) => (
          <QuestionCard
            key={q._id}
            question={q}
            onEdit={handleEditQuestion}
            onDelete={openDeleteModal}
          />
        ))}
      </div>
    </div>
  );
}
