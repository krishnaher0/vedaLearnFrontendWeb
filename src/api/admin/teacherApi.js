import axios from "../api"

// services/admTeacherService.js


export const getAllTeacherApi = async ({ page, limit }) => {
  const token = localStorage.getItem("token");
  console.log("🔑 Sending token:", token); 

  const response = await axios.get(`/admin/teacher`, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ attach token here
    },
  });

  return response.data;
};

export const getOneTeacherApi = (id) => axios.get("/admin/teacher/" + id )
export const createOneTeacherApi = (data) => axios.post("/admin/teacher/" , data)
export const updateOneTeacherApi = (id, data) => axios.put("/admin/teacher/" + id, data)
export const deleteOneTeacherApi = (id) => axios.delete("/admin/teacher/" + id)