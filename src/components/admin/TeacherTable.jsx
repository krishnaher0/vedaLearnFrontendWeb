import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  useAdminTeacher,
  useCreateTeacher,
  useUpdateTeacher,
  useDeleteTeacher,
} from "../../hooks/admin/useAdminTeacher";
import TeacherForm from "../auth/TeacherForm";

export default function TeacherTable() {
  const qc = useQueryClient();
  const { data = [], isLoading, isError, error } = useAdminTeacher();

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const createMutation = useCreateTeacher();
  const updateMutation = useUpdateTeacher();
  const deleteMutation = useDeleteTeacher();

  const handleAdd = () => {
    setSelectedTeacher(null);
    setShowForm(true);
  };

  const handleEdit = (t) => {
    setSelectedTeacher(t);
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
        {
          onSuccess: () => setShowForm(false),
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setShowForm(false),
      });
    }
  };

  const handleDelete = (t) => {
    if (window.confirm("Delete this teacher?")) {
      deleteMutation.mutate(t._id);
    }
  };



  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (isError)
    return <div className="text-red-500 text-center py-4">{error.message}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {showForm && (
        <TeacherForm
          teacher={selectedTeacher}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Teacher Table</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Teacher
        </button>
      </div>
      <div className="overflow-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-5 text-left">Name</th>
              <th className="py-3 px-5 text-left">Email</th>
              <th className="py-3 px-5 text-left">Age</th>
              <th className="py-3 px-5 text-left">Join Date</th>
              <th className="py-3 px-5 text-center">CV</th>
              <th className="py-3 px-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((teacher) => (
              <tr key={teacher._id} className="hover:bg-gray-100">
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.age}</td>
                <td>{new Date(teacher.createdAt).toLocaleDateString()}</td>
                <td className="text-center">
                  {teacher.cvImage ? (
                    <a
                      href={`http://localhost:3001/${teacher.cvImage}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline">
                      View CV
                    </a>
                  ) : (
                    <span className="text-gray-400">No CV</span>
                  )}
                </td>
                <td className="text-center space-x-2">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher)}
                    className="bg-red-500 text-white px-3 py-1 rounded">
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
