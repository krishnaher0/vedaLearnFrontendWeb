import React, { useState ,useEffect} from "react";
import { useQueryClient } from "@tanstack/react-query";
import DeleteModal from "../DeleteModal";

import {
  useGetTeacher,
  useAddTeacher,
  useUpdateTeacher,
  useDeleteTeacher,
} from "../../hooks/admin/useAdminTeacher";
import TeacherForm from "../auth/TeacherForm";

export default function TeacherTable() {
    const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  

  // // Fetch teachers when search or page changes
  // useEffect(() => {
  //   const fetchTeachers = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3001/api/teachers", {
  //         params: { search, page, limit },
  //       });
  //       setTeachers(res.data.data);
  //       setTotalPages(res.data.totalPages);
  //     } catch (err) {
  //       console.error("Failed to fetch teachers:", err);
  //     }
  //   };

  //   fetchTeachers();
  // }, [search, page]);

  // const handleSearchChange = (e) => {
  //   setSearch(e.target.value);
  //   setPage(1); // reset page to 1 on new search
  // };

  // const goPrevious = () => {
  //   if (page > 1) setPage((p) => p - 1);
  // };

  // const goNext = () => {
  //   if (page < totalPages) setPage((p) => p + 1);
  // };
  const qc = useQueryClient();
  const { data = [], isLoading, isError, error } = useGetTeacher();

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const createMutation = useAddTeacher();
  const updateMutation = useUpdateTeacher();
  const deleteMutation = useDeleteTeacher();
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


  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (isError)
    return <div className="text-red-500 text-center py-4">{error.message}</div>;

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
       <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onConfirm={confirmDeleteCourse}
              title="Delete Course"
              description="Are you sure you want to delete this course?"
            />
      {showForm && (
        <div className="fixed inset-0  flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto p-6 overflow-y-auto max-h-[90vh]">
            <TeacherForm
              teacher={selectedTeacher}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Teacher Table</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
          + Add Teacher
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-xl border border-gray-200">
        {" "}
        {/* Added overflow-x-auto for responsiveness and shadow-xl for more depth */}
        <table className="min-w-full divide-y divide-gray-200">
          {" "}
          {/* Added divide-y */}
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Age
              </th>
              <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Join Date
              </th>
              <th className="py-3 px-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                CV
              </th>
              <th className="py-3 px-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((teacher, index) => (
              <tr
                key={teacher._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {" "}
                {/* Zebra stripes */}
                <td className="py-3 px-5 whitespace-nowrap text-sm text-gray-800">
                  {teacher.name}
                </td>
                <td className="py-3 px-5 whitespace-nowrap text-sm text-gray-800">
                  {teacher.email}
                </td>
                <td className="py-3 px-5 whitespace-nowrap text-sm text-gray-800">
                  {teacher.age}
                </td>
                <td className="py-3 px-5 whitespace-nowrap text-sm text-gray-800">
                  {new Date(teacher.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-5 text-center whitespace-nowrap">
                  {teacher.cvImage ? (
                    <a
                      href={`http://localhost:3001/${teacher.cvImage}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-medium transition duration-200 ease-in-out">
                      View CV
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">No CV</span>
                  )}
                </td>
                <td className="py-3 px-5 text-center whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium transition duration-200 ease-in-out">
                    Edit
                  </button>
                  <button
                      onClick={() => openDeleteModal(teacher._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition duration-200 ease-in-out">
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
