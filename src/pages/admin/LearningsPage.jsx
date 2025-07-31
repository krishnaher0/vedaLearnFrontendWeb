import React, { useState } from 'react';
// import {
//  // For fetching courses
//   useLearningsByCourse,
//   useCreateLearning,
//   useUpdateLearning,
//   useDeleteLearning,
// } from '../../hooks/admin'; // Adjust import paths accordingly


import { useGetCourses } from '../../hooks/admin/useAdminCourse';
import { useCreateLearning, useDeleteLearning, useLearningsByCourse, useUpdateLearning } from '../../hooks/learningHook';

export default function LearningsPage() {
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedLearning, setSelectedLearning] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'

  // Fetch courses first
  const { data: coursesData, isLoading: coursesLoading, error: coursesError } = useGetCourses();

  // Fetch learnings based on selected course
  const {
    data: learnings = [],
    isLoading: learningsLoading,
    error: learningsError,
  } = useLearningsByCourse(selectedCourseId);

  const createLearning = useCreateLearning();
  const updateLearning = useUpdateLearning();
  const deleteLearning = useDeleteLearning();

  // Handlers to open modal
  const openCreateModal = () => {
    setSelectedLearning(null);
    setModalMode('create');
    setShowModal(true);
  };

  const openEditModal = (learning) => {
    setSelectedLearning(learning);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this learning?')) {
      deleteLearning.mutate(id);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Learnings</h1>

      {/* Course selector */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Select Course:</label>
        {coursesLoading ? (
          <div>Loading courses...</div>
        ) : coursesError ? (
          <div className="text-red-600">Failed to load courses</div>
        ) : (
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="border p-2 rounded w-full max-w-xs"
          >
            <option value="">-- Select a course --</option>
            {coursesData?.data?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.language}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Button to add learning */}
      <button
        onClick={openCreateModal}
        disabled={!selectedCourseId}
        className={`mb-4 px-4 py-2 rounded text-white ${
          selectedCourseId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        + Add Learning
      </button>

      {/* Learnings list */}
      {learningsLoading ? (
        <div>Loading learnings...</div>
      ) : learningsError ? (
        <div className="text-red-600">Error loading learnings</div>
      ) : (
        <div className="space-y-4">
          {learnings.length === 0 && <p>No learnings found for this course.</p>}
          {learnings.map((learning) => (
            <div
              key={learning._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{learning.title}</h3>
                <p className="text-sm text-gray-600">
                  Type: {learning.type} | Media URL: {learning.mediaUrl}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => openEditModal(learning)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(learning._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for create or edit */}
      {showModal && (
        <LearningFormModal
          mode={modalMode}
          learning={selectedLearning}
          courseId={selectedCourseId}
          onClose={() => setShowModal(false)}
          onCreate={(data) => createLearning.mutate(data)}
          onUpdate={(id, data) => updateLearning.mutate({ id, formData: data })}
        />
      )}
    </div>
  );
}
