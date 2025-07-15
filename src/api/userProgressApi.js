import axios from "./api"
export const enrollCourseApi = (userId, courseId) => {
  return axios.post(`http://localhost:3001/api/user/progress/${userId}/enroll-course`, {
    courseId,  // courseId sent in the body
  }).then(res => res.data);
};
export const completeLessonApi = (userId,lessonId) => {
  return axios.post(`user/progress/${userId}/complete-lesson`, lessonId);
};

export const updateProgressApi = async (userId, progressData) => {
  try {
    const response = await axios.post(`user/progress/${userId}/update-progress`, progressData);
    console.log("demo",response)
    return response.data;

    
  } catch (error) {
    console.error("❌ Error updating progress:", error);
    // You can either throw the error again or return a custom error object
    throw error;
  }
};
// export const fetchQuestionByIndexApi = (lessonId, questionIndex) => {
//   return axios.get(`user/progress/lesson/${lessonId}/question/${questionIndex}`, {
//     params: { lessonId, questionIndex },
//   });
// };
export const getProgressApi = (userId) => {
  // progressData: { lessonId, questionId, isCorrect, ... }
  return axios.get(`user/progress/${userId}/`)
  .then((res) => res.data.stats); ;
};