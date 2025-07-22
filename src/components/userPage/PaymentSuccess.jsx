import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  // const [searchParams] = useSearchParams();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const pid = searchParams.get("pid");
  //   const amt = searchParams.get("amt");
  //   const userId = searchParams.get("userId");
  //   const plan = searchParams.get("plan");
  //   const refId = searchParams.get("refId") || "some-ref-id"; // You might get this from somewhere else

  //   // Call backend to verify payment
  //   axios
  //     .get("/api/payment/payment-success", {
  //       params: { amt, oid: pid, refId, userId, plan },
  //     })
  //     .then((res) => {
  //       alert(res.data.message);
  //       // Redirect or update UI accordingly
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       alert("Payment verification failed.");
  //       navigate("/");
  //     });
  // }, [searchParams, navigate]);

  return <h1>Payment Succeed</h1>;
};

export default PaymentSuccess;
