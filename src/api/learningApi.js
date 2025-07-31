import axios from "./api"; // or wherever your axios base instance is

export const getLearningsByCourseApi = async (courseId) => {
  const res = await axios.get(`/admin/learnings/${courseId}`);
  return res.data.data; // Assuming success:true and data: [...]
};

export const createLearningApi = async (formData) => {
  const res = await axios.post('/admin/learnings', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const updateLearningApi = async (id, formData) => {
  const res = await axios.put(`/admin/learnings/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteLearningApi = async (id) => {
  const res = await axios.delete(`/admin/learnings/${id}`);
  return res.data;
};
