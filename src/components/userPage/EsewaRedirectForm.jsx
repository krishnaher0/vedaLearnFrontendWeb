// Since you want Java, I'll first provide the backend part is done (which you already have).
// For frontend, React/JS is usually used for form submission; Java is backend only.

// But if you want a **Java backend servlet code** that generates and sends the HTML form to client, I can help too.

// For now, here's a **React example** of how to use your backend response:

import React, { useEffect, useRef } from "react";

function ESewaPaymentForm({ paymentData }) {
  // paymentData: { formAction: string, fields: object }

  const formRef = useRef(null);

  useEffect(() => {
    // Auto-submit form when component loads
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  if (!paymentData) return null;

  return (
    <form ref={formRef} action={paymentData.formAction} method="POST">
      {Object.entries(paymentData.fields).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <button type="submit">Pay with eSewa</button>
    </form>
  );
}

export default ESewaPaymentForm;
