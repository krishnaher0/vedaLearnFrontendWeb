import axios from "./api";

export const initiateEsewaPaymentApi = (planId, token) => {
  return axios.get(`/subscription/buy/${planId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
