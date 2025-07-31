import React, { useState } from "react";

const esewaConfig = {
  merchantId: "EPAYTEST", // eSewa test merchant ID
  successUrl: "http://localhost:5173/payment-success",
  failureUrl: "http://localhost:5173/payment-failure",
  paymentUrl: "https://rc-epay.esewa.com.np/api/epay/main/v2/form", // v2 API endpoint
};

const PaymentComponent = () => {
  const [amount, setAmount] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const productId = `ORDER_${Date.now()}`; // unique order/product id

    // Create form element
    const form = document.createElement("form");
    form.method = "POST";
    form.action = esewaConfig.paymentUrl;

    // eSewa payment fields
    const fields = {
      total_amount: amount,
      transaction_uuid: productId,
      product_code: esewaConfig.merchantId,
      success_url: `${esewaConfig.successUrl}?productId=${productId}&amount=${amount}`,
      failure_url: `${esewaConfig.failureUrl}?productId=${productId}`,
      product_delivery_charge: "0",
      product_service_charge: "0",
      tax_amount: "0",
    };

    // Append inputs to form
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    // Add form to body and submit
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      <h1>eSewa Payment Integration</h1>

      <form className="styled-form" onSubmit={handlePayment}>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter amount"
            min="1"
          />
        </div>

        <button type="submit" className="submit-button">
          Pay with eSewa
        </button>
      </form>
    </div>
  );
};

export default PaymentComponent;
