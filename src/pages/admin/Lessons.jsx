import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  useGetLessonsByCourse,
  useCreateLesson,
  useUpdateLesson,
  useDeleteLesson,
} from "../../hooks/admin/useAdminLesson";
import LessonForm from "../../components/admin/LessonsForm";
import DeleteModal from "../../components/DeleteModal";

export default function Lessons() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const { data: lessons = [], isLoading, isError, refetch } = useGetLessonsByCourse(courseId);

  const createLessonMutation = useCreateLesson();
  const updateLessonMutation = useUpdateLesson();
  const deleteLessonMutation = useDeleteLesson();

  const [showLessonForm, setShowLessonForm] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [lessonIdToDelete, setLessonIdToDelete] = useState(null);

  const handleViewQuestions = (courseId, lessonId) => {
    navigate(`/admin/courses/${courseId}/lessons/${lessonId}/questions`);
  };

  // Open form to add new lesson
  const handleAddLesson = () => {
    setSelectedLesson(null);
    setShowLessonForm(true);
  };

  // Open form to edit existing lesson
  const handleEditLesson = (lesson) => {
    console.log(lesson)
    setSelectedLesson(lesson);
    setShowLessonForm(true);
  };

  // Cancel form (add/edit)
  const handleCancelLesson = () => {
    setShowLessonForm(false);
    setSelectedLesson(null);
  };

  // Save lesson (create or update)
  const handleSaveLesson = (formData) => {
    if (selectedLesson) {
      updateLessonMutation.mutate(
        { lessonId: selectedLesson._id, lessonData: formData },
        {
          onSuccess: () => {
            setShowLessonForm(false);
            setSelectedLesson(null);
            refetch();
          },
        }
      );
    } else {
      createLessonMutation.mutate(formData, {
        onSuccess: () => {
          setShowLessonForm(false);
          refetch();
          console.log(formData);
        },
      });
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (lessonId) => {
    setLessonIdToDelete(lessonId);
    console.log(lessonId);
    setDeleteModalOpen(true);
  };

  // Confirm deletion
  const confirmDeleteLesson = async () => {
    if (!lessonIdToDelete) return;

    try {
      await deleteLessonMutation.mutateAsync(lessonIdToDelete);
      setDeleteModalOpen(false);
      setLessonIdToDelete(null);
      refetch();
    } catch (err) {
      console.error("Failed to delete lesson:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-r-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-purple-500/20 border-l-purple-500 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <span className="ml-4 text-slate-300 font-medium">Loading lessons...</span>
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
          <p className="text-red-400 font-medium">Error loading lessons</p>
          <p className="text-slate-400 text-sm mt-1">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteLesson}
        title="Delete Lesson"
        description="Are you sure you want to delete this lesson?"
      />

      {/* Lesson Form Modal */}
      {showLessonForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl max-w-2xl w-full mx-auto overflow-hidden">
            {/* Modal decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
            
            {/* Close button */}
            <button
              onClick={handleCancelLesson}
              className="absolute top-4 right-4 z-20 w-8 h-8 bg-slate-800/50 hover:bg-slate-700/50 rounded-full border border-slate-600/50 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-all duration-200"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="relative z-10 p-8 overflow-y-auto max-h-[90vh]">
              <LessonForm
                lesson={selectedLesson}
                onSubmit={handleSaveLesson}
                onCancel={handleCancelLesson}
                courses={[{ _id: courseId, title: "Current Course" }]}
              />
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Lesson Management
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddLesson}
            className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Lesson
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
              Back to Courses
            </span>
          </button>
        </div>
      </div>

      {/* Lessons Table */}
      <div className="relative bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>

        {/* Table content */}
        <div className="relative z-10 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Level
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Lesson No
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {lessons.map((lesson, index) => (
                <tr
                  key={lesson._id}
                  onClick={() => handleViewQuestions(courseId, lesson._id)}
                  className="group cursor-pointer hover:bg-slate-800/30 transition-all duration-200"
                >
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-200 group-hover:text-white transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                      {lesson.level}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-200 group-hover:text-white transition-colors">
                    <span className="px-3 py-1 bg-slate-800/50 rounded-full text-xs font-medium border border-slate-600/30">
                      {lesson.lessonNo}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    {lesson.title}
                  </td>
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditLesson(lesson);
                        }}
                        className="group/btn relative px-3 py-2 bg-yellow-600/20 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/30 hover:text-yellow-300 transition-all duration-200 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></div>
                        <span className="relative z-10 flex items-center gap-1 text-xs font-medium">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </span>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(lesson._id);
                        }}
                        className="group/btn relative px-3 py-2 bg-red-600/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30 hover:text-red-300 transition-all duration-200 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></div>
                        <span className="relative z-10 flex items-center gap-1 text-xs font-medium">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {lessons.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <p className="text-slate-400 font-medium">No lessons found</p>
                      <p className="text-slate-500 text-sm mt-1">Create your first lesson to get started</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}