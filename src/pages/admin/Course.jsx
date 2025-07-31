import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddCourse,
  useDeleteCourse,
  useUpdateCourse,
  useGetCourses,
} from "../../hooks/admin/useAdminCourse";
import DeleteModal from "../../components/DeleteModal";
import CourseTable from "../../components/CourseTable";
import CourseCards from "../../components/CourseCards";
import CourseForm from "../../components/admin/CourseForm";

export default function Courses() {
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("table");

  const { data = [], isLoading, isError, error } = useGetCourses();
  const createMutation = useAddCourse();
  const updateMutation = useUpdateCourse();
  const deleteMutation = useDeleteCourse();

  const [showCourseForm, setShowCourseForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState(null);

  const openDeleteModal = (courseId) => {
    setCourseIdToDelete(courseId);
    setDeleteModalOpen(true);
  };

  const confirmDeleteCourse = async () => {
    if (!courseIdToDelete) return;

    try {
      await deleteMutation.mutateAsync(courseIdToDelete);
      console.log("Course deleted successfully!");
    } catch (err) {
      console.error("Error deleting course:", err);
    } finally {
      setDeleteModalOpen(false);
      setCourseIdToDelete(null);
    }
  };

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setShowCourseForm(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setShowCourseForm(true);
  };

  const handleSaveCourse = (formData) => {
    try {
      if (selectedCourse) {
        updateMutation.mutate(
          {
            courseId: selectedCourse._id,
            formData,
          },
          {
            onSuccess: () => setShowCourseForm(false),
          }
        );
        console.log("Course updated successfully!");
      } else {
        createMutation.mutate(formData, {
          onSuccess: () => setShowCourseForm(false),
        });
      }
      console.log(formData);
      setShowCourseForm(false);
      setSelectedCourse(null);
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  const handleCancelCourse = () => {
    setShowCourseForm(false);
    setSelectedCourse(null);
  };

  const handleViewLessons = (courseId) => {
    navigate(`${courseId}/lessons`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-32 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 left-32 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-indigo-500/3 rounded-full blur-3xl"></div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteCourse}
        title="Delete Course"
        description="Are you sure you want to delete this course?"
      />

      {/* Course Form Modal */}
      {showCourseForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-xl shadow-2xl max-w-lg w-full mx-auto p-6 overflow-y-auto max-h-[90vh] border border-slate-600/50">
            <CourseForm
              course={selectedCourse}
              onCancel={handleCancelCourse}
              onSave={handleSaveCourse}
            />
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="relative z-10 mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Course Management
            </h2>
            <p className="text-slate-400">Manage and organize your language courses</p>
          </div>

          <div className="flex items-center gap-4">
            {/* View Type Selector */}
            <div className="relative">
              <select
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
                className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 cursor-pointer hover:bg-white/15 pr-10"
              >
                <option value="card" className="bg-slate-800 text-white">Card View</option>
                <option value="table" className="bg-slate-800 text-white">Table View</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Add Course Button */}
            <button
              onClick={handleAddCourse}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 group"
            >
              <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">+</span>
              </div>
              <span className="group-hover:scale-105 transition-transform duration-300">Add Course</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {viewType === "table" ? (
          <CourseTable
            courses={data}
            onEdit={handleEditCourse}
            onDelete={openDeleteModal}
            onViewLessons={handleViewLessons}
          />
        ) : (
          <CourseCards
            courses={data}
            onEdit={handleEditCourse}
            onDelete={openDeleteModal}
            onViewLessons={handleViewLessons}
          />
        )}
      </div>
    </div>
  );
}
