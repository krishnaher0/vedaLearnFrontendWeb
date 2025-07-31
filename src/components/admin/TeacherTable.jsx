import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaCalendarAlt,
  FaFileAlt,
  FaEdit,
  FaTrash,
  FaUserTie,
  FaPlus,
} from "react-icons/fa";
import {
  useGetTeacher,
  useAddTeacher,
  useUpdateTeacher,
  useDeleteTeacher,
} from "../../hooks/admin/useAdminTeacher";
import DeleteModal from "../DeleteModal";
import TeacherForm from "./TeacherForm";

export default function TeacherTable() {
  const { data = [], isLoading, isError, error } = useGetTeacher();
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const createMutation = useAddTeacher();
  const updateMutation = useUpdateTeacher();
  const deleteMutation = useDeleteTeacher();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState(null);

  const openDeleteModal = (id) => {
    setCourseIdToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteCourse = async () => {
    if (!courseIdToDelete) return;
    try {
      await deleteMutation.mutateAsync(courseIdToDelete);
    } catch (err) {
      console.error("Error deleting teacher:", err);
    } finally {
      setDeleteModalOpen(false);
      setCourseIdToDelete(null);
    }
  };

  const handleAdd = () => {
    setSelectedTeacher(null);
    setShowForm(true);
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setShowForm(true);
  };

  const handleCancel = () => {
    setSelectedTeacher(null);
    setShowForm(false);
  };

  const handleSave = (formData) => {
    if (selectedTeacher) {
      updateMutation.mutate(
        { teacherId: selectedTeacher._id, formData },
        { onSuccess: () => setShowForm(false) }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setShowForm(false),
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3">
          <div className="animate-spin w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full"></div>
          <span className="text-white font-medium">Loading teachers...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-gradient-to-br from-red-900/20 via-red-800/20 to-red-900/20 border border-red-500/30 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">!</span>
          </div>
          <span className="text-red-300 font-medium">
            Error fetching teachers: {error.message}
          </span>
        </div>
      </div>
    );
  }

  const teachers = data || [];

  return (
    <div className="space-y-8">
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteCourse}
        title="Delete Teacher"
        description="Are you sure you want to delete this teacher?"
      />

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-xl shadow-2xl max-w-lg w-full mx-auto p-6 overflow-y-auto max-h-[90vh] border border-slate-600/50">
            <TeacherForm
              teacher={selectedTeacher}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaChalkboardTeacher className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Teacher Directory</h2>
              <p className="text-slate-400">
                {teachers.length} {teachers.length === 1 ? "instructor" : "instructors"}{" "}
                registered
              </p>
            </div>
          </div>
          
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
            <FaPlus className="text-sm" />
            <span>Add Teacher</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      {teachers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 backdrop-blur-sm rounded-xl border border-indigo-500/30 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <FaChalkboardTeacher className="text-white text-lg" />
              </div>
              <div>
                <p className="text-indigo-300 text-sm font-medium">Total Teachers</p>
                <p className="text-white text-xl font-bold">{teachers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl border border-emerald-500/30 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <FaEnvelope className="text-white text-lg" />
              </div>
              <div>
                <p className="text-emerald-300 text-sm font-medium">
                  Active Emails
                </p>
                <p className="text-white text-xl font-bold">
                  {teachers.filter((t) => t.email).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FaUser className="text-white text-lg" />
              </div>
              <div>
                <p className="text-purple-300 text-sm font-medium">Avg Age</p>
                <p className="text-white text-xl font-bold">
                  {teachers.length > 0
                    ? Math.round(
                        teachers.reduce((sum, t) => sum + (t.age || 0), 0) /
                          teachers.length
                      )
                    : 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl border border-orange-500/30 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <FaFileAlt className="text-white text-lg" />
              </div>
              <div>
                <p className="text-orange-300 text-sm font-medium">
                  CVs Uploaded
                </p>
                <p className="text-white text-xl font-bold">
                  {teachers.filter((t) => t.cvImage).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teachers Table */}
      <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/50 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>

        <div className="relative z-10 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <FaUserTie className="text-white text-sm" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Instructor Management
              </h3>
              <p className="text-slate-400 text-sm">
                Manage and view all registered teachers
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-indigo-400 text-sm" />
                      <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
                        Name
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-emerald-400 text-sm" />
                      <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
                        Email
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <FaBirthdayCake className="text-purple-400 text-sm" />
                      <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
                        Age
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-orange-400 text-sm" />
                      <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
                        Join Date
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <FaFileAlt className="text-blue-400 text-sm" />
                      <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
                        CV
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <FaEdit className="text-yellow-400 text-sm" />
                      <span className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
                        Actions
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, idx) => (
                  <tr
                    key={teacher._id}
                    className={`border-b border-slate-700/50 transition-all duration-300 ${
                      idx % 2 === 0
                        ? "bg-slate-800/30 hover:bg-slate-700/50"
                        : "bg-slate-900/30 hover:bg-slate-700/50"
                    }`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-sm">
                            {teacher.name?.charAt(0)?.toUpperCase() || "T"}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-white">
                            {teacher.name}
                          </span>
                          <div className="text-xs text-slate-400">Instructor</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-slate-300">{teacher.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {teacher.age}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-md flex items-center justify-center">
                          <FaCalendarAlt className="text-white text-xs" />
                        </div>
                        <span className="text-slate-300 font-medium">
                          {formatDate(teacher.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        {teacher.cvImage ? (
                          <div className="relative group">
                            <img
                              src={`http://localhost:3001/${teacher.cvImage}`}
                              alt="CV"
                              className="h-10 w-10 object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-300 group-hover:scale-110"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="absolute inset-0 bg-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-slate-600/50 rounded-lg flex items-center justify-center">
                              <FaFileAlt className="text-slate-400 text-xs" />
                            </div>
                            <span className="text-slate-400 text-sm">No CV</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(teacher)}
                          className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all duration-300 transform hover:scale-105">
                          <FaEdit className="text-xs" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => openDeleteModal(teacher._id)}
                          className="flex items-center space-x-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all duration-300 transform hover:scale-105">
                          <FaTrash className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {teachers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                          <FaChalkboardTeacher className="text-slate-400 text-2xl" />
                        </div>
                        <div>
                          <p className="text-slate-400 font-medium">
                            No teachers found
                          </p>
                          <p className="text-slate-500 text-sm">
                            Teachers will appear here once they register
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}