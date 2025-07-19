// src/api/planApi.js
import axios from "../api";

const token = localStorage.getItem("token"); // If token-based auth is used

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const getAllPlans = () => axiosInstance.get("/plan/");
export const getPlanById = (id) => axiosInstance.get(`/plan/${id}`);
export const createPlan = (data) => axiosInstance.post("/plan/", data);
export const updatePlan = (id, data) => axiosInstance.put(`/plan/${id}`, data);
export const deletePlan = (id) => axiosInstance.delete(`/plan/${id}`);
