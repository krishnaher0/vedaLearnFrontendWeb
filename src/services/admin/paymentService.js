// src/services/paymentService.js
import { fetchPayments } from "../api/paymentApi";

export const getAllPayments = async () => {
  try {
    const payments = await fetchPayments();
    // You can add any additional logic here, like filtering or mapping
    return payments;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};
