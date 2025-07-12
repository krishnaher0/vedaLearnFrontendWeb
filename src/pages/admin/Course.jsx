// src/pages/CoursesPage.jsx
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

import CourseForm from "../../components/admin/CourseForm"; // New component for Course CRUD

export default function Courses() {
   const [imagePreview, setImagePreview] = useState("");
  const navigate=useNavigate();
  const [viewType, setViewType] = useState("table"); // default to "table"

    const { data=[], isLoading, isError, error } = useGetCourses();
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
      // Optionally: trigger a refetch or state update to remove deleted course from UI
    } catch (err) {
      console.error("Error deleting course:", err);
    } finally {
      setDeleteModalOpen(false);
      setCourseIdToDelete(null);
    }
  };



  // Opens the form for adding a new course
  const handleAddCourse = () => {
    setSelectedCourse(null); // Ensure no course is selected for a new add
    setShowCourseForm(true);
  };

  // Opens the form for editing an existing course
  const handleEditCourse = (course) => {
    setSelectedCourse(course); // Set the course data for editing
    setShowCourseForm(true);
  };


  const handleSaveCourse =  (formData) => {
    try {
      if (selectedCourse) {
         updateMutation.mutate({
          courseId: selectedCourse._id,
           formData,
        },
         {
          onSuccess: () => setShowCourseForm(false),
        }
      );
        console.log("Course updated successfully!");
      } else {
        // Otherwise, we are adding a new course
        createMutation.mutate(formData, {
        onSuccess: () => setShowCourseForm(false),
      });
      }
      console.log(formData)
      setShowCourseForm(false); // Close the form after successful save
      setSelectedCourse(null); // Clear selected course
    } catch (err) {
      console.error("Error saving course:", err);
      // Optional: Display an error message to the user
    }
  };

  // Closes the form without saving
  const handleCancelCourse = () => {
    setShowCourseForm(false);
    setSelectedCourse(null); // Clear selected course
  };
const handleViewLessons = (courseId) => {
  navigate(`${courseId}/lessons`); // relative path
  
};


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto p-6 overflow-y-auto max-h-[90vh]">
            <CourseForm
              course={selectedCourse}
              onCancel={handleCancelCourse}
              onSave={handleSaveCourse}
            />
          </div>
        </div>
      )}

      {/* Page Header */}
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
  <h2 className="text-2xl font-semibold text-gray-800">Course Management</h2>
  
  <div className="flex items-center gap-3">
    <select
      value={viewType}
      onChange={(e) => setViewType(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
    >
      <option value="card">Card View</option>
      <option value="table">Table View</option>
    </select>
    
    <button
      onClick={handleAddCourse}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
    >
      + Add Course
    </button>
  </div>
</div>
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
  );
}
