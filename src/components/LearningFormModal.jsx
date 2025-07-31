import React, { useState, useEffect } from 'react';

export default function LearningFormModal({ mode, learning, courseId, onClose, onCreate, onUpdate }) {
  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState({
    title: '',
    type: 'audio', // default type
    textContent: '',
    mediaFile: null,
  });

  useEffect(() => {
    if (isEdit && learning) {
      setFormData({
        title: learning.title || '',
        type: learning.type || 'audio',
        textContent: learning.textContent || '',
        mediaFile: null, // no pre-filled file input possible
      });
    }
  }, [isEdit, learning]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'mediaFile') {
      setFormData((prev) => ({ ...prev, mediaFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseId) {
      alert('Please select a course first.');
      return;
    }
    if (!formData.title || !formData.type || (!isEdit && !formData.mediaFile)) {
      alert('Please fill all required fields.');
      return;
    }

    // Prepare formData for multipart/form-data upload
    const payload = new FormData();
    payload.append('course', courseId);
    payload.append('title', formData.title);
    payload.append('type', formData.type);
    if (formData.textContent) payload.append('textContent', formData.textContent);
    if (formData.mediaFile) payload.append('file', formData.mediaFile);

    if (isEdit) {
      onUpdate(learning._id, payload);
    } else {
      onCreate(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit Learning' : 'Add New Learning'}</h2>

        <label className="block mb-2 font-semibold">Title*</label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
          required
        />

        <label className="block mb-2 font-semibold">Type*</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
          required
        >
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>

        <label className="block mb-2 font-semibold">Text Content (optional)</label>
        <textarea
          name="textContent"
          value={formData.textContent}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4 h-24"
          placeholder="Optional text description"
        />

        <label className="block mb-2 font-semibold">{isEdit ? 'Change Media File' : 'Upload Media File*'}</label>
        <input
          name="mediaFile"
          type="file"
          accept="audio/*,video/*"
          onChange={handleChange}
          className="mb-4"
          required={!isEdit}
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
