import React, { useState } from "react";
import PlanCard from "./planCard";
import PlanFormModal from "./planFormModal";
import { usePlans } from "../hooks/admin/usePlanHook";

import { FaPlus, FaSpinner } from "react-icons/fa";

export default function PlansList() {
  const { data, isLoading, error } = usePlans();

  // Show modal state
  const [showModal, setShowModal] = useState(false);
  // Store the plan to edit; null means create mode
  const [editingPlan, setEditingPlan] = useState(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700">
        <div className="flex items-center space-x-3">
          <FaSpinner className="animate-spin text-blue-400 text-xl" />
          <span className="text-white font-medium">Loading plans...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gradient-to-br from-red-900/20 via-red-800/20 to-red-900/20 border border-red-500/30 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">!</span>
          </div>
          <span className="text-red-300 font-medium">Error loading plans</span>
        </div>
      </div>
    );
  }

  // Open modal for creating new plan
  const handleCreateClick = () => {
    setEditingPlan(null); // no plan selected = create mode
    setShowModal(true);
  };

  // Open modal for editing an existing plan
  const handleEditClick = (plan) => {
    setEditingPlan(plan);
    setShowModal(true);
  };

  return (
    <div className="relative p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Available Plans</h2>
          <p className="text-slate-400">Manage subscription plans and pricing</p>
        </div>
        
        <button
          className="group relative flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
          onClick={handleCreateClick}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
            <FaPlus className="text-white text-sm" />
          </div>
          <span className="relative z-10">Add Plan</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((plan) => (
          <PlanCard
            key={plan._id}
            plan={plan}
            onClick={() => handleEditClick(plan)}
          />
        ))}
      </div>

      {showModal && (
        <PlanFormModal
          mode={editingPlan ? "edit" : "create"}
          plan={editingPlan}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}