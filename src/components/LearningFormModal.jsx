import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Video, Volume2, Sparkles } from 'lucide-react';

export default function LearningFormModal({ mode, learning, courseId, onClose, onCreate, onUpdate }) {
  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState({
    title: '',
    type: 'audio', // default type
    textContent: '',
    mediaUrl: null,
  });

  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (isEdit && learning) {
      setFormData({
        title: learning.title || '',
        type: learning.type || 'audio',
        textContent: learning.textContent || '',
        mediaUrl: null, // no pre-filled file input possible
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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
        setFormData((prev) => ({ ...prev, mediaUrl: file }));
      }
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
    if (formData.mediaUrl) payload.append('file', formData.mediaUrl);

    if (isEdit) {
      onUpdate(learning._id, payload);
    } else {
      onCreate(payload);
    }

    onClose();
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'audio':
        return <Volume2 className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {isEdit ? 'Edit Learning Material' : 'Create New Learning'}
              </h2>
              <p className="text-sm text-white/70">
                {isEdit ? 'Update your learning content' : 'Add multimedia content to your course'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6" encType="multipart/form-data">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Title *
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              placeholder="Enter learning material title"
              required
            />
          </div>

          {/* Type Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white flex items-center gap-2">
              {getTypeIcon(formData.type)}
              Content Type *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 ${
                formData.type === 'audio' 
                  ? 'border-green-500/50 bg-green-500/10' 
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="audio"
                  checked={formData.type === 'audio'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <Volume2 className={`w-6 h-6 ${formData.type === 'audio' ? 'text-green-400' : 'text-white/60'}`} />
                  <div>
                    <div className={`font-semibold ${formData.type === 'audio' ? 'text-green-300' : 'text-white'}`}>
                      Audio
                    </div>
                    <div className="text-xs text-white/60">
                      MP3, WAV, etc.
                    </div>
                  </div>
                </div>
              </label>
              
              <label className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 ${
                formData.type === 'video' 
                  ? 'border-purple-500/50 bg-purple-500/10' 
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="video"
                  checked={formData.type === 'video'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <Video className={`w-6 h-6 ${formData.type === 'video' ? 'text-purple-400' : 'text-white/60'}`} />
                  <div>
                    <div className={`font-semibold ${formData.type === 'video' ? 'text-purple-300' : 'text-white'}`}>
                      Video
                    </div>
                    <div className="text-xs text-white/60">
                      MP4, AVI, etc.
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description (Optional)
            </label>
            <textarea
              name="textContent"
              value={formData.textContent}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
              placeholder="Add any additional notes or description for this learning material..."
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white flex items-center gap-2">
              <Upload className="w-4 h-4" />
              {isEdit ? 'Change Media File (Optional)' : 'Upload Media File *'}
            </label>
            
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
                dragActive
                  ? 'border-blue-500/50 bg-blue-500/10'
                  : 'border-white/30 bg-white/5 hover:bg-white/10'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                name="mediaFile"
                type="file"
                accept="audio/*,video/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required={!isEdit}
              />
              
              <div className="text-center">
                {formData.mediaFile ? (
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto">
                      {formData.mediaFile.type.startsWith('video/') ? (
                        <Video className="w-6 h-6 text-green-400" />
                      ) : (
                        <Volume2 className="w-6 h-6 text-green-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{formData.mediaFile.name}</p>
                      <p className="text-white/60 text-sm">{formatFileSize(formData.mediaFile.size)}</p>
                    </div>
                    <p className="text-green-400 text-sm">✓ File selected</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6 text-white/60" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Drop your file here or click to browse
                      </p>
                      <p className="text-white/60 text-sm">
                        Supports audio and video files
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              {isEdit ? 'Update Learning' : 'Create Learning'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}