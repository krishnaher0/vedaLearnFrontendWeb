import React, { useState } from "react";
import ESewaPaymentForm from "./EsewaRedirectForm";

function PaymentPage() {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    try {
      const response = await fetch("/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 100, productId: "prod123" }),
      });
      const data = await response.json();
      setPaymentData(data); // this triggers form render + auto-submit
    } catch (error) {
      alert("Failed to start payment");
    }
    setLoading(false);
  }

  if (paymentData) {
    // Show the auto-submitting form that redirects to eSewa
    return <ESewaPaymentForm paymentData={paymentData} />;
  }

  return (
    <div>
      <button onClick={handlePay} disabled={loading}>
        {loading ? "Processing..." : "Pay with eSewa"}
      </button>
    </div>
  );
}

export default PaymentPage;
