import { initiateEsewaPaymentApi,getUserSubscriptionsApi } from "../api/subscriptionApi";

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

export const getUserSubscriptionsService = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await getUserSubscriptionsApi(token);
    return res.data.data; // assuming backend wraps subscriptions inside `data`
  } catch (error) {
    // console.error("❌ Error fetching subscriptions:", error);
    throw error.response?.data || { message: "Failed to fetch subscriptions" };
  }
};
