
// Get all lessons of a course

import { getLessonsByCourseApi,createLessonApi,updateLessonApi,deleteLessonApi } from "../../api/admin/lessonApi";

export const getLessonsByCourseService = async (courseId) => {
  try {
    const response = await getLessonsByCourseApi(courseId);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to fetch lessons" };
  }
};

export const createLessonService = async (lessonData) => {
  try {
    const response = await createLessonApi(lessonData);
    return response.data.data; // assuming your backend returns lesson data here
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to create lesson" };
  }
};

export const updateLessonService = async (lessonId, lessonData) => {
  try {
    const response = await updateLessonApi(lessonId, lessonData);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to update lesson" };
  }
};


export const deleteLessonService = async (lessonId) => {
  try {
    const response = await deleteLessonApi(lessonId);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to delete lesson" };
  }
};