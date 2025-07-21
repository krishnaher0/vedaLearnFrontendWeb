import { initiateEsewaPaymentApi } from "../api/subscriptionApi";

export const initiateEsewaPaymentService = async (planId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await initiateEsewaPaymentApi(planId, token);
    return res.data; // contains uid, price, productCode, signature, etc.
  } catch (error) {
    console.error("❌ Esewa Service Error:", error);
    throw error.response?.data || { message: "Failed to start eSewa payment" };
  }
};
