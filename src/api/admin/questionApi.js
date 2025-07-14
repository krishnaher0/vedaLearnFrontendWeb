import axios from "../api"; // your pre-configured axios instance

export const getQuestionsApi = (params) => {
  const token = localStorage.getItem("token");
  return axios.get("/admin/questions", {
    headers: { Authorization: `Bearer ${token}` },
    params, // optional filter: { courseId, lessonId, type }
  });
};

export const getQuestionsByLessonApi = (lessonId) => {
  const token = localStorage.getItem("token");
  return axios.get(`/admin/questions/lesson/${lessonId}`, {
    // headers: { Authorization: `Bearer ${token}` },
    
  });
};

export const getQuestionByIdApi = (questionId) => {
  const token = localStorage.getItem("token");
  return axios.get(`/admin/questions/${questionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createQuestionApi = (formData) => {
  const token = localStorage.getItem("token");
  return axios.post("/admin/questions", formData, {
    headers: { Authorization: `Bearer ${token}`,
    
    },
    // body: JSON.stringify(formData),
    
    
    
  });
};

export const createQuestionsBatchApi = (questionsArray) => {
  const token = localStorage.getItem("token");
  return axios.post("/admin/questions/batch", questionsArray, {
    headers: { Authorization: `Bearer ${token}` },
    // body: JSON.stringify(formData),
  });
};

export const updateQuestionApi = (questionId, formData) => {
  const token = localStorage.getItem("token");
  return axios.put(`/admin/questions/${questionId}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteQuestionApi = (questionId) => {
  const token = localStorage.getItem("token");
  return axios.delete(`/admin/questions/${questionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 🔵 Get a single question by lesson ID and index
export const getQuestionByLessonIndexApi = (lessonId, questionIndex) => {
  const token = localStorage.getItem("token");

  return axios.get(`/admin/questions/lesson/${lessonId}/index/${questionIndex}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

