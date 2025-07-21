import {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
} from "../../api/admin/planApi";

// 🟢 Get all plans
export const getPlansService = async () => {
  try {
    const res = await getAllPlans();
    return res.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to fetch plans" };
  }
};

// 🔵 Get single plan
export const getPlanByIdService = async (id) => {
  try {
    const res = await getPlanById(id);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to fetch plan" };
  }
};

// 🟢 Create plan
export const createPlanService = async (data) => {
  try {
    const res = await createPlan(data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to create plan" };
  }
};

// 🟠 Update plan
export const updatePlanService = async (id, data) => {
  try {
    const res = await updatePlan(id, data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to update plan" };
  }
};

// 🔴 Delete plan
export const deletePlanService = async (id) => {
  try {
    const res = await deletePlan(id);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to delete plan" };
  }
};
