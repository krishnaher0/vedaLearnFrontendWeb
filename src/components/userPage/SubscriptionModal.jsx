


import React from "react";
import { usePlans } from "../../hooks/admin/usePlanHook";
import { useEsewaPayment } from "../../hooks/useSubscriptionHook";

const SubscriptionModal = () => {
  const { data: plans, isLoading } = usePlans();
  const esewaMutation = useEsewaPayment();

  const handleEsewaPayment = async (planId) => {
    try {
      const {
        uid,
        price,
        productCode,
        signature,
        success_url,
        failure_url,
      } = await esewaMutation.mutateAsync(planId);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const fields = {
        amount: price,
        tax_amount: 0,
        total_amount: price,
        transaction_uuid: uid,
        product_code: productCode,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url,
        failure_url,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature,
      };

      for (const key in fields) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      alert("❌ Failed to initiate payment");
    }
  };

  if (isLoading) return <div>Loading plans...</div>;
  if (!plans?.length) return <div>No plans available.</div>;

  return (
    <div className="w-[1200px] bg-white text-black border border-gray-200 shadow-2xl rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-2">Upgrade to Premium</h2>
      <p className="text-gray-700 mb-4">
        Transform your language learning journey with premium features designed
        to accelerate your progress.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`border p-4 rounded-lg ${
              plan.name === "premium" ? "border-2 border-blue-500 shadow" : ""
            }`}
          >
            <h3 className="text-lg font-bold capitalize">{plan.name}</h3>
            <p className="text-2xl font-bold mt-2">
              Rs. {plan.price.toLocaleString()}{" "}
              <span className="text-sm">/year</span>
            </p>
            <ul className="text-sm mt-2 space-y-1 text-gray-600">
              <li>✓ Features coming soon...</li>
            </ul>
            <button
              onClick={() => handleEsewaPayment(plan._id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mt-4"
            >
              Subscribe {plan.name.charAt(0).toUpperCase() + plan.name.slice(1)} with eSewa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionModal;
