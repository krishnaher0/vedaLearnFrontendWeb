// services/admin/learningService.js

import { getLearningsByCourseApi } from "../api/learningApi";

export const fetchLearningsByCourse = (courseId) => {
  return getLearningsByCourseApi(courseId);
};

// Create new learning
export const createLearningService = (formData) => {
  return createLearningApi(formData);
};

// Update existing learning by id
export const updateLearningService = (id, formData) => {
  return updateLearningApi(id, formData);
};

// Delete learning by id
export const deleteLearningService = (id) => {
  return deleteLearningApi(id);
};
