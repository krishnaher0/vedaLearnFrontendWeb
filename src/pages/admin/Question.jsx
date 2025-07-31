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

  if (!lessonId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium">Select a lesson to view questions</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-r-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-purple-500/20 border-l-purple-500 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <span className="ml-4 text-slate-300 font-medium">Loading questions...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-400 font-medium">Failed to load questions</p>
          <p className="text-slate-400 text-sm mt-1">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const filteredQuestions = selectedType
    ? questions.filter((q) => q.questionType === selectedType)
    : questions;

  return (
    <div className="space-y-6">
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Question"
        description="Are you sure you want to delete this question? This action cannot be undone."
      />

      {showQuestionForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden">
            {/* Modal decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
            
            {/* Close button */}
            <button
              onClick={handleCancelQuestion}
              className="absolute top-4 right-4 z-20 w-8 h-8 bg-slate-800/50 hover:bg-slate-700/50 rounded-full border border-slate-600/50 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-all duration-200"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="relative z-10 p-8 overflow-y-auto max-h-[90vh]">
              <QuestionFormModal
                onSave={handleSave}
                onCancel={handleCancelQuestion}
                initialData={selectedQuestion}
                lessonId={lessonId}
              />
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Question Management
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
          </div>
          {lessonTitle && (
            <div className="px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-600/50 backdrop-blur-sm">
              <p className="text-slate-300 text-sm font-medium">{lessonTitle}</p>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddQuestion}
            className="group relative px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Question
            </span>
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="group relative px-6 py-3 bg-slate-800/50 text-slate-300 font-semibold rounded-xl border border-slate-600/50 backdrop-blur-sm hover:bg-slate-700/50 hover:border-slate-500/70 hover:text-slate-200 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 to-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Lessons
            </span>
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="relative bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-lg p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>
        <div className="relative z-10">
          <label htmlFor="questionType" className="block text-sm font-semibold text-slate-300 mb-3">
            Filter by Question Type
          </label>
          <div className="relative">
            <select
              id="questionType"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full max-w-xs bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70 appearance-none cursor-pointer"
            >
              <option value="" className="bg-slate-800 text-slate-200">All Types</option>
              {[...new Set(questions.map((q) => q.questionType))].map((type) => (
                <option key={type} value={type} className="bg-slate-800 text-slate-200">
                  {type}
                </option>
              ))}
            </select>
            
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredQuestions.length === 0 ? (
          <div className="col-span-full">
            <div className="relative bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-lg p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-400 font-medium text-lg mb-2">No questions found</p>
                <p className="text-slate-500 text-sm">
                  {selectedType ? `No ${selectedType} questions available` : "Create your first question to get started"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <QuestionCard
              key={q._id}
              question={q}
              onEdit={handleEditQuestion}
              onDelete={openDeleteModal}
            />
          ))
        )}
      </div>
    </div>
  );
}