

import React, { useState, useEffect } from "react";

export default function CourseForm({ course, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    language: "",
    description: "",
    flagPath:null
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
      console.log("file:",selectedFile.name)
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {course ? "Edit Course" : "Add New Course"}
      </h3>

      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
          Language
        </label>
        <input
          type="text"
          id="language"
          name="language"
          value={formData.language}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="flagPath" className="block text-sm font-medium text-gray-700">
          Flag Image
        </label>
        <input
          type="file"
          id="flagPath"
          name="flagPath"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Flag Preview"
            className="mt-2 h-24 w-auto rounded border"
          />
        )}
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save Course
        </button>
      </div>
    </form>
  );
}
