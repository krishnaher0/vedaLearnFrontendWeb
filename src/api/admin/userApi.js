import axios from "../api"

// services/admin/userService.js


export const getAllUserApi = async ({ page, limit }) => {
  const token = localStorage.getItem("token");
  console.log("🔑 Sending token:", token); 

  const response = await axios.get(`/admin/user`, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ attach token here
    },
  });

  return response.data;
};

export const getOneUserApi = (id) => axios.get("/admin/user/" + id )
export const createOneUserApi = (data) => axios.post("/admin/user/" , data)
export const updateOneUserApi = (id, data) => axios.put("/admin/user/" + id, data)
export const deleteOneUserApi = (id) => axios.delete("/admin/user/" + id)