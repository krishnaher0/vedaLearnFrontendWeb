import axios from "./api";

export const initiateEsewaPaymentApi = (planId, token) => {
  return axios.get(`/subscription/buy/${planId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// api/subscriptionApi.js
export const getUserSubscriptionsApi = (token) => {
  return axios.get("/subscription/subscribed-users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
