import axios from "../api";
export const getLessonsByCourseApi = (courseId) => {
  const token = localStorage.getItem("token");
  return axios.get(`/admin/lessons/course/${courseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createLessonApi = (formData) => {
  const token = localStorage.getItem("token");
  return axios.post(`/admin/lessons`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
     
     
      
    },
  
  body: JSON.stringify(formData),
  });
};

export const updateLessonApi = (lessonId, formData) => {
  const token = localStorage.getItem("token");
  return axios.put(`/admin/lessons/${lessonId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
     
    },
    body: JSON.stringify(formData),
  });
};

export const deleteLessonApi = (lessonId) => {
  const token = localStorage.getItem("token");
  return axios.delete(`/admin/lessons/${lessonId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};