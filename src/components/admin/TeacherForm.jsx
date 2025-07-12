import React, { useState, useEffect } from "react";

export default function TeacherForm({ teacher, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    cvImage: null,
  });

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name,
        email: teacher.email,
        age: teacher.age,
        password: "", // don't prefill password on edit
        cvImage: null,
      });
    }
  }, [teacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setFormData((prev) => ({ ...prev, cvImage: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("age", formData.age);

    if (!teacher) {
      // For create only: add password & default role
      payload.append("password", formData.password);
      payload.append("role", "Teacher");
    }

    if (formData.cvImage) {
      console.log("File being sent:", formData.cvImage);
      payload.append("cvImage", formData.cvImage);
      console.log("file:",formData.cvImage)
    } else {
      console.log("⚠️ No file selected");
    }
    console.log("Payload content before sending to onSave:", payload);
    for (let [key, value] of payload.entries()) {
        console.log(key, value);
    }

    onSave(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      // Remove bg-white, rounded, shadow-md, mb-6 as these are now handled by the parent modal wrapper
      className="p-6" // Keep padding
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center"> {/* Centered heading, increased size and margin */}
        {teacher ? "Edit Teacher" : "Add New Teacher"} {/* More descriptive titles */}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"> {/* Adjusted gap values */}
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label> {/* Label styling */}
          <input
            id="name" // Added id for accessibility
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out sm:text-sm" // Enhanced input styling
            required
          />
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label> {/* Label styling */}
          <input
            id="email" // Added id for accessibility
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out sm:text-sm" // Enhanced input styling
            required
          />
        </div>
        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label> {/* Label styling */}
          <input
            id="age" // Added id for accessibility
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out sm:text-sm" // Enhanced input styling
            required
          />
        </div>
        {/* Password – only on create */}
        {!teacher && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label> {/* Label styling */}
            <input
              id="password" // Added id for accessibility
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 ease-in-out sm:text-sm" // Enhanced input styling
              required
            />
          </div>
        )}
        {/* CV upload */}
        <div className="sm:col-span-2"> {/* Make CV upload span full width on small screens and up */}
          <label htmlFor="cvImage" className="block text-sm font-medium text-gray-700 mb-1">CV Image</label> {/* Label styling */}
          <input
            id="cvImage" // Added id for accessibility
            type="file"
            name="cvImage"
            accept="image/*"
            onChange={handleFile}
            className="w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100 transition duration-150 ease-in-out" // Styled file input
          />
           {formData.cvImage && typeof formData.cvImage === 'object' && (
            <p className="mt-2 text-sm text-gray-500">Selected file: {formData.cvImage.name}</p>
          )}
        </div>
      </div>
      <div className="mt-8 flex justify-end gap-3"> {/* Adjusted margin-top and gap, aligned buttons to end */}
        <button
          type="button" // Change to type="button" to prevent accidental form submission
          onClick={onCancel}
          className="px-5 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out">
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out">
          Save
        </button>
      </div>
    </form>
  );
}