import React, { useState } from 'react';
import { Search, Plus, Edit3, Trash2, Play, Volume2, Eye, BookOpen } from 'lucide-react';

import { useGetCourses } from '../../hooks/admin/useAdminCourse';
import { useCreateLearning, useDeleteLearning, useLearningsByCourse, useUpdateLearning } from '../../hooks/learningHook';
import LearningFormModal from '../../components/LearningFormModal';
import { getBackendMediaUrl } from '../../utils/backend-media';




import VideoPreview from '../../components/admin/videoPreview'
import AudioPreview from '../../components/admin/audioPreview';

export default function LearningsPage() {
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedLearning, setSelectedLearning] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [searchTerm, setSearchTerm] = useState('');

  const getBlobUrl = async (mediaUrl) => {
  const res = await fetch(mediaUrl);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
};

  const {
    data: coursesData,
    isLoading: coursesLoading,
    error: coursesError,
  } = useGetCourses();

  const {
    data: learnings = [],
    isLoading: learningsLoading,
    error: learningsError,
  } = useLearningsByCourse(selectedCourseId);

  const createLearning = useCreateLearning();
  const updateLearning = useUpdateLearning();
  const deleteLearning = useDeleteLearning();

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

  const filteredLearnings = learnings.filter((learning) =>
    learning.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learning.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'audio':
        return <Volume2 className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'audio':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Learning Management</h1>
            <p className="text-sm text-white/70">Manage course content and learning materials</p>
          </div>
          <button
            onClick={openCreateModal}
            disabled={!selectedCourseId}
            className={`inline-flex items-center px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 ${
              selectedCourseId
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                : 'bg-white/10 text-white/50 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Learning
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Select & Search */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-white mb-2 block">Select Course</label>
              {coursesLoading ? (
                <div className="h-10 bg-white/10 rounded animate-pulse" />
              ) : coursesError ? (
                <div className="text-red-400 text-sm">Failed to load courses</div>
              ) : (
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                >
                  <option value="">-- Select a course --</option>
                  {coursesData?.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.language}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="text-sm text-white mb-2 block">Search Learnings</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={!selectedCourseId}
                  className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedCourseId ? (
          learningsLoading ? (
            <div className="text-white">Loading learnings...</div>
          ) : learningsError ? (
            <div className="text-red-400">Failed to load learnings</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredLearnings.map((learning) => (
                <div
                  key={learning._id}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{learning.title}</h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 mt-2 rounded-full text-xs font-medium border ${getTypeColor(learning.type)}`}
                      >
                        {getTypeIcon(learning.type)}
                        <span className="ml-1 capitalize">{learning.type}</span>
                      </span>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => openEditModal(learning)}
                        title="Edit"
                        className="p-2 text-yellow-400 hover:bg-yellow-500/10 rounded"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(learning._id)}
                        title="Delete"
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Preview Media */}
                  {learning.type === 'video' && learning.mediaUrl ? (
                    <VideoPreview mediaUrl={getBackendMediaUrl(learning.mediaUrl)} />
                  ) : learning.type === 'audio' && learning.mediaUrl ? (
                    <AudioPreview mediaUrl={getBackendMediaUrl(learning.mediaUrl)} />
                  ) : (
                    <div className="text-white/50 text-sm text-center py-6">
                      No media preview available.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-white/60 text-center py-12">
            Please select a course to view its learnings.
          </div>
        )}
      </div>

      {/* Modal */}
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
