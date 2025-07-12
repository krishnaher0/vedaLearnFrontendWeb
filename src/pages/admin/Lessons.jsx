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
  const { courseId,lessonId } = useParams();
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
      // Ensure courseId is included
      // if (!formData.course) formData.course = courseId;

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

  if (isLoading) return <div>Loading lessons...</div>;
  if (isError) return <div>Error loading lessons.</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto p-6 overflow-y-auto max-h-[90vh]">
            <LessonForm
  lesson={selectedLesson} // ✅ correct
  onSubmit={handleSaveLesson}
  onCancel={handleCancelLesson}
  courses={[{ _id: courseId, title: "Current Course" }]} 
/>
            <button
              onClick={handleCancelLesson}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
              aria-label="Close"
            >
              
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <h2 className="text-2xl font-semibold text-gray-800">Lesson Management</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddLesson}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
          >
            + Add Lesson
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded transition"
          >
            Back to Courses
          </button>
        </div>
      </div>

      {/* Lessons list */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Level
              </th>
              <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Lesson No
              </th>
              <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="py-3 px-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lessons.map((lesson, index) => (
            
             <tr
  key={lesson._id}
  onClick={() => handleViewQuestions(courseId,lesson._id)}
  className={`cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
>
  <td className="py-3 px-5 whitespace-nowrap text-sm text-gray-800">
    {lesson.level}
  </td>
  <td className="py-3 px-5 whitespace-nowrap text-sm text-gray-800">
    {lesson.lessonNo}
  </td>
  <td className="py-3 px-5 whitespace-nowrap text-sm text-gray-800">
    {lesson.title}
  </td>
  <td className="py-3 px-5 text-center space-x-2 whitespace-nowrap">
    <button
      onClick={(e) => {
        e.stopPropagation(); // ✅ Prevent row click
        handleEditLesson(lesson);
      }}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition"
    >
      Edit
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation(); // ✅ Prevent row click
        openDeleteModal(lesson._id);
      }}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
    >
      Delete
    </button>
  </td>
</tr>

            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No lessons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
    
  );
  
}
