import React, { useState, useEffect } from "react";
import {
  usePlans,
  useCreatePlan,
  useUpdatePlan,
  useDeletePlan,
} from "../../hooks/admin/usePlanHook"; // Your hooks file

export default function PlanManagement() {
  // State for form input
  const [formData, setFormData] = useState({ name: "", price: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // React Query hooks
  const { data: plans, isLoading, error } = usePlans();
  const createMutation = useCreatePlan();
  const updateMutation = useUpdatePlan();
  const deleteMutation = useDeletePlan();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create or Update form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate(
        { id: editingId, data: formData },
        {
          onSuccess: () => {
            setEditingId(null);
            setFormData({ name: "", price: "", description: "" });
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setFormData({ name: "", price: "", description: "" }),
      });
    }
  };

  // Edit button clicked: populate form for editing
  const handleEdit = (plan) => {
    setEditingId(plan._id);
    setFormData({ name: plan.name, price: plan.price, description: plan.description });
  };

  // Delete button clicked
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      deleteMutation.mutate(id);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", price: "", description: "" });
  };

  // Loading and error states
  if (isLoading) return <div>Loading plans...</div>;
  if (error) return <div>Error loading plans.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* ======= CREATE / UPDATE FORM ======= */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Plan" : "Add New Plan"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Plan Name"
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            rows={3}
            className="w-full border border-gray-300 p-2 rounded resize-none"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={createMutation.isLoading || updateMutation.isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {editingId ? "Update Plan" : "Add Plan"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* ======= LIST / READ PLANS ======= */}
      <section>
        <h2 className="text-xl font-bold mb-4">Plans List</h2>
        <table className="w-full text-left border-collapse border border-gray-300 shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-3">Name</th>
              <th className="border border-gray-300 p-3">Price</th>
              <th className="border border-gray-300 p-3">Description</th>
              <th className="border border-gray-300 p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No plans found.
                </td>
              </tr>
            )}
            {plans?.map((plan) => (
              <tr key={plan._id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
                <td className="border border-gray-300 p-3">{plan.name}</td>
                <td className="border border-gray-300 p-3">${plan.price}</td>
                <td className="border border-gray-300 p-3">{plan.description}</td>
                <td className="border border-gray-300 p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="text-red-600 hover:underline"
                    disabled={deleteMutation.isLoading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
