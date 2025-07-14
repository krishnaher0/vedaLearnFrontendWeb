import axios from "./api"
export const enrollCourseApi = (userId, courseId) => {
  return axios.post(`user/progress/${userId}/enroll-course`);
};

export const completeLessonApi = (userId) => {
  return axios.post(`user/progress/${userId}/complete-lesson`, );
};

export const updateProgressApi = (userId, progressData) => {
  // progressData: { lessonId, questionId, isCorrect, ... }
  return axios.post(`user/progress/${userId}/`, progressData);
};

// export const fetchQuestionByIndexApi = (lessonId, questionIndex) => {
//   return axios.get(`user/progress/lesson/${lessonId}/question/${questionIndex}`, {
//     params: { lessonId, questionIndex },
//   });
// };