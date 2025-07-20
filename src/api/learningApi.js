import axios from "./api"; // or wherever your axios base instance is

export const getLearningsByCourseApi = async (courseId) => {
  const res = await axios.get(`/admin/learnings/${courseId}`);
  return res.data.data; // Assuming success:true and data: [...]
};
