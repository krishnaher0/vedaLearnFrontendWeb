import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaLock,
  FaFileImage,
  FaSave,
  FaTimes,
  FaChalkboardTeacher,
} from "react-icons/fa";

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
      console.log("file:", formData.cvImage);
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
    <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-xl shadow-2xl border border-slate-600/50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-purple-500/10 rounded-full blur-lg"></div>

      <form onSubmit={handleSubmit} className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-600/50">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <FaChalkboardTeacher className="text-white text-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {teacher ? "Edit Teacher" : "Add New Teacher"}
            </h3>
            <p className="text-slate-400 text-sm">
              {teacher ? "Update instructor information" : "Register a new instructor"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <FaUser className="text-blue-400 text-xs" />
              <span>Full Name</span>
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 transition-all duration-300"
                placeholder="Enter full name"
                required
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent rounded-lg pointer-events-none"></div>
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <FaEnvelope className="text-emerald-400 text-xs" />
              <span>Email Address</span>
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-400 transition-all duration-300"
                placeholder="Enter email address"
                required
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-transparent rounded-lg pointer-events-none"></div>
            </div>
          </div>

          {/* Age Field */}
          <div className="space-y-2">
            <label htmlFor="age" className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <FaBirthdayCake className="text-purple-400 text-xs" />
              <span>Age</span>
            </label>
            <div className="relative">
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-slate-400 transition-all duration-300"
                placeholder="Enter age"
                min="18"
                max="100"
                required
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent rounded-lg pointer-events-none"></div>
            </div>
          </div>

          {/* Password Field - only on create */}
          {!teacher && (
            <div className="space-y-2">
              <label htmlFor="password" className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                <FaLock className="text-orange-400 text-xs" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 border border-slate-600 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-slate-400 transition-all duration-300"
                  placeholder="Enter secure password"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-transparent rounded-lg pointer-events-none"></div>
              </div>
            </div>
          )}

          {/* CV Upload Field */}
          <div className={`space-y-2 ${!teacher ? 'sm:col-span-2' : 'sm:col-span-1'}`}>
            <label htmlFor="cvImage" className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <FaFileImage className="text-cyan-400 text-xs" />
              <span>CV Document</span>
            </label>
            <div className="relative">
              <input
                id="cvImage"
                type="file"
                name="cvImage"
                accept="image/*"
                onChange={handleFile}
                className="w-full bg-slate-700/50 border border-slate-600 text-slate-300 rounded-lg transition-all duration-300
                           file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                           file:text-sm file:font-semibold file:bg-gradient-to-r file:from-cyan-500 file:to-cyan-600
                           file:text-white hover:file:from-cyan-600 hover:file:to-cyan-700
                           file:transition-all file:duration-300 file:shadow-md"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-transparent rounded-lg pointer-events-none"></div>
            </div>
            {formData.cvImage && typeof formData.cvImage === 'object' && (
              <div className="mt-2 p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-md flex items-center justify-center">
                    <FaFileImage className="text-white text-xs" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{formData.cvImage.name}</span>
                  <div className="flex-1"></div>
                  <span className="text-cyan-400 text-xs font-medium">Selected</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-600/50 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-600/50 hover:bg-slate-600/70 text-slate-300 hover:text-white rounded-lg font-medium transition-all duration-300 border border-slate-500/50 hover:border-slate-400/50"
          >
            <FaTimes className="text-sm" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaSave className="text-sm" />
            <span>{teacher ? "Update Teacher" : "Add Teacher"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}