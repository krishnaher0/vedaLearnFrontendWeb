// src/pages/CoursesPage.jsx
import React, { useState } from "react";
import {
  useAddCourse,
  useDeleteCourse,
  useUpdateCourse,
  useGetCourses,
} from "../../hooks/admin/useAdminCourse";
import DeleteModal from "../../components/DeleteModal";

import CourseForm from "../../components/auth/CourseForm"; // New component for Course CRUD

export default function Courses() {
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Course Management
        </h2>
        <button
          onClick={handleAddCourse}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
        >
          + Add Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Language
              </th>
              <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="py-3 px-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Flag
              </th>
              <th className="py-3 px-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((course, index) => (
              <tr
                key={course.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-5 whitespace-nowrap text-sm text-gray-800">
                  {course.language}
                </td>
                <td className="py-3 px-5 text-sm text-gray-800 max-w-xs overflow-hidden text-ellipsis">
                  {course.description}
                </td>
                <td className="py-3 px-5 text-center">
                  {course.flagPath ? (
                    <a
                      href={`http://localhost:3001/${course.flagPath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Flag
                    </a>
                  ) : (
                    <span className="text-gray-400">No Flag</span>
                  )}
                </td>
                <td className="py-3 px-5 text-center space-x-2">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(course._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
