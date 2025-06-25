// src/api/admin/courseApi.js
import axios from "../../api/api"; // Assuming this imports your configured axios instance

// --- API Calls for Courses ---

// Add a new course (with file upload)
export const createOneCourseApi = (formData) => {
  const token = localStorage.getItem("token");
  return axios.post("/admin/courses", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Crucial for FormData with file
    },
  });
};

// Fetch all courses
export const getAllCoursesApi = () => {
  const token = localStorage.getItem("token");
  return axios.get("/admin/courses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Fetch one course by ID
export const getCourseByIdApi = (courseId) => {
  const token = localStorage.getItem("token");
  return axios.get(`/admin/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Update a course (assuming it can also have file updates)
export const updateOneCourseApi = ({ courseId, formData }) => {
  const token = localStorage.getItem("token");
  return axios.put(`/admin/courses/${courseId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Crucial for FormData with file
    },
  });
};

// Delete a course by ID
export const deleteOneCourseApi = (courseId) => {
  const token = localStorage.getItem("token");
  return axios.delete(`/admin/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};