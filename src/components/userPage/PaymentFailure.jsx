import React from "react";

export default function PaymentFailure() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-red-600 text-xl font-semibold mb-4">
        Payment Failed
      </h2>
      <p>Please try again or contact support if the issue persists.</p>
    </div>
  );
}
