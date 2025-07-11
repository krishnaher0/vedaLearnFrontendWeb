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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {lesson ? "Edit Lesson" : "Add New Lesson"}
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700">Level</label>
        <input
          type="text"
          name="level"
          value={formData.level}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Lesson No
        </label>
        <input
          type="text"
          name="lessonNo"
          value={formData.lessonNo}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          courseId
        </label>
        <select
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <option value="">Select a courseId</option>
  {courses.map((course) => (
  <option key={course._id} value={course._id}>
    {course.language}
  </option>
))}
        </select>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Save Lesson
        </button>
      </div>
    </form>
  );
}
