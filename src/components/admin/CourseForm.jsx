


import React, { useState, useEffect } from "react";

export default function CourseForm({ course, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    language: "",
    description: "",
    flagPath: null
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (course) {
      setFormData({
        language: course.language || "",
        description: course.description || "",
      });
      if (course.flagPath) {
        setImagePreview(`http://localhost:3001/${course.flagPath}`);
      } else {
        setImagePreview("");
      }
      setSelectedFile(null); // reset selected file on edit load
    } else {
      setFormData({ language: "", description: "" });
      setSelectedFile(null);
      setImagePreview("");
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file);
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append("language", formData.language);
    dataToSend.append("description", formData.description);

    if (selectedFile) {
      dataToSend.append("flagPath", selectedFile);
      console.log("file:", selectedFile.name)
    } else {
      console.log("⚠️ No file selected");
    }

    // Optional: log FormData entries to verify
    for (let [key, value] of dataToSend.entries()) {
      console.log(key, value);
    }

    onSave(dataToSend);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Form Container with Glass Effect */}
      <div className="relative bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>
        
        {/* Form Content */}
        <div className="relative z-10 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {course ? "Edit Course" : "Add New Course"}
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>

            {/* Language Field */}
            <div className="space-y-2">
              <label htmlFor="language" className="block text-sm font-semibold text-slate-300 mb-2">
                Language
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70"
                  placeholder="Enter language name"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
              </div>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-semibold text-slate-300 mb-2">
                Description
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70 resize-none"
                  placeholder="Enter course description"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
              </div>
            </div>

            {/* File Upload Field */}
            <div className="space-y-2">
              <label htmlFor="flagPath" className="block text-sm font-semibold text-slate-300 mb-2">
                Flag Image
              </label>
              
              {/* Custom File Upload Area */}
              <div className="relative">
                <div className="relative bg-slate-800/30 border-2 border-dashed border-slate-600/50 rounded-xl p-6 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-800/50">
                  <input
                    type="file"
                    id="flagPath"
                    name="flagPath"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-slate-300 text-sm font-medium mb-1">
                      {selectedFile ? selectedFile.name : "Choose flag image"}
                    </p>
                    <p className="text-slate-500 text-xs">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Flag Preview"
                      className="h-32 w-auto rounded-xl border border-slate-600/50 shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={onCancel}
                className="relative px-6 py-3 text-sm font-semibold text-slate-300 bg-slate-800/50 rounded-xl border border-slate-600/50 backdrop-blur-sm hover:bg-slate-700/50 hover:border-slate-500/70 hover:text-slate-200 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 to-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Cancel</span>
              </button>
              
              <button
                type="submit"
                className="relative px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Course
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}