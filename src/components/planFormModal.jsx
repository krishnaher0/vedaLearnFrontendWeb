import React, { useState, useEffect } from 'react';
import { useCreatePlan, useUpdatePlan } from '../hooks/admin/usePlanHook';
import { FaTimes, FaTag, FaDollarSign, FaAlignLeft } from 'react-icons/fa';

function PlanFormModal({ mode, plan, onClose }) {
  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const addPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();

  useEffect(() => {
    if (isEdit && plan) {
      setFormData({
        name: plan.name,
        price: plan.price,
        description: plan.description?.join('\n') || '',
      });
    }
  }, [plan, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      description: formData.description.split('\n').map((d) => d.trim()),
    };

    if (isEdit) {
      updatePlan.mutate({ id: plan._id, data: payload }, { onSuccess: onClose });
    } else {
      addPlan.mutate(payload, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-600 overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>

        {/* Header */}
        <div className="relative z-10 flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {isEdit ? 'Edit Plan' : 'Create New Plan'}
            </h2>
            <p className="text-slate-400 text-sm">
              {isEdit ? 'Update plan details' : 'Add a new subscription plan'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 border border-white/20"
          >
            <FaTimes className="text-white text-sm" />
          </button>
        </div>

        {/* Form */}
        <div className="relative z-10 space-y-6">
          {/* Plan Name */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm">Plan Name</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FaTag className="text-white text-xs" />
                </div>
              </div>
              <input
                name="name"
                placeholder="Enter plan name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-14 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/15 transition-all duration-300"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm">Price</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <FaDollarSign className="text-white text-xs" />
                </div>
              </div>
              <input
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-14 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:bg-white/15 transition-all duration-300"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm">Description</label>
            <div className="relative">
              <div className="absolute left-3 top-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FaAlignLeft className="text-white text-xs" />
                </div>
              </div>
              <textarea
                name="description"
                placeholder="Enter description (one feature per line)"
                value={formData.description}
                onChange={handleChange}
                className="w-full pl-14 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/15 transition-all duration-300 h-32 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="relative z-10 flex justify-between mt-8 space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            {isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}
export default PlanFormModal;