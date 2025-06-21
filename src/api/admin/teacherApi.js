import axios from "../api"

// services/admTeacherService.js


export const getAllTeacherApi = async ({ page, limit }) => {
  const token = localStorage.getItem("token");
  console.log("🔑 Sending token:", token); 

  const response = await axios.get(`/admin/teacher`, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  return response.data;
};

export const getOneTeacherApi = (id) => axios.get("/auth/register/teacher/" + id )

export const createOneTeacherApi = (formData) => {
  

  const token = localStorage.getItem("token");
  return axios.post("/auth/register/teacher/", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // DO NOT manually set 'Content-Type' — Axios will handle it
    },
  });
};

export const updateOneTeacherApi = (id, formData) => {
  const token = localStorage.getItem('token');
  return axios.put(`/admin/teacher/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteOneTeacherApi = (id) => axios.delete(`/admin/teacher/${id}`)