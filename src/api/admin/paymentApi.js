import axios from "../api";

export const verifyPayment = async ({ amt, oid, refId, token }) => {
  return axios.get('/payment/verify-payment', {
    params: { amt, oid, refId },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

