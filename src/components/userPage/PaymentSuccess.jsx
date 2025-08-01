import React,{ useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");

    if (status === "success") {
      toast.success("✅ Payment successful!");
    } else {
      toast.success("✅ Payment successful!");
    }

    // Navigate to login after 2 seconds
    const timeout = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [location, navigate]);

  return (
    <div className="text-center mt-20 text-xl text-green-600">
      Processing your payment...
    </div>
  );
}
