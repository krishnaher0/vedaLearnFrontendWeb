import React, { useState, useEffect } from "react";

export default function LessonForm({
  lesson,
  onSubmit,
  onCancel,
  courses = [],
}) {
  const [formData, setFormData] = useState({
    level: "",
    lessonNo: "",
    title: "",
    courseId: "",
  });

  useEffect(() => {
    if (lesson) {
      setFormData({
        level: lesson.level,
        lessonNo: lesson.lessonNo,
        title: lesson.title,
        courseId: lesson.course._id,
      });
    } else {
      setFormData({
        level: "",
        lessonNo: "",
        title: "",
        courseId: "",
      });
    }
  }, [lesson]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    onSubmit(formData);
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
                {lesson ? "Edit Lesson" : "Add New Lesson"}
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>

            {/* Level Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Level
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70"
                  placeholder="Enter lesson level (e.g., Beginner, Intermediate)"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
              </div>
            </div>

            {/* Lesson No Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Lesson Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="lessonNo"
                  value={formData.lessonNo}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70"
                  placeholder="Enter lesson number (e.g., 1, 2, 3)"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
              </div>
            </div>

            {/* Title Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Lesson Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70"
                  placeholder="Enter lesson title"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
              </div>
            </div>

            {/* Course Selection Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Course
              </label>
              <div className="relative">
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-slate-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500/70 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800 text-slate-400">Select a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id} className="bg-slate-800 text-slate-200">
                      {course.language}
                    </option>
                  ))}
                </select>
                
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
              </div>
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
                  Save Lesson
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}