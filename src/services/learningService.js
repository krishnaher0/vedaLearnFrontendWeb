// services/admin/learningService.js

import { getLearningsByCourseApi } from "../api/learningApi";

export const fetchLearningsByCourse = (courseId) => {
  return getLearningsByCourseApi(courseId);
};
