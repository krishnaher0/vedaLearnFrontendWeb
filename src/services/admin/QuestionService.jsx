import {
  getQuestionsApi,
  getQuestionByLessonIndexApi,
  getQuestionsByLessonApi,
  getQuestionByIdApi,
  createQuestionApi,
  createQuestionsBatchApi,
  updateQuestionApi,
  deleteQuestionApi,
} from "../../api/admin/questionApi";

// 🟢 Get all questions (with optional filters)
export const getQuestionsService = async (params) => {
  try {
    const response = await getQuestionsApi(params);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to fetch questions" };
  }
};

// 🔵 Get questions by lesson
export const getQuestionsByLessonService = async (lessonId) => {
  try {
    const response = await getQuestionsByLessonApi(lessonId);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to fetch questions for lesson" };
  }
};

// 🟢 Get single question
export const getQuestionByIdService = async (questionId) => {
  try {
    const response = await getQuestionByIdApi(questionId);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to fetch question" };
  }
};

// 🔵 Create a question
export const createQuestionService = async (questionData) => {
  try {
    const response = await createQuestionApi(questionData);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to create question" };
  }
};

// 🔵 Create multiple questions
export const createQuestionsBatchService = async (questionsArray) => {
  try {
    const response = await createQuestionsBatchApi(questionsArray);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to create batch questions" };
  }
};

// 🟠 Update question
export const updateQuestionService = async (questionId, questionData) => {
  try {
    const response = await updateQuestionApi(questionId, questionData);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to update question" };
  }
};

// 🔴 Delete question
export const deleteQuestionService = async (questionId) => {
  try {
    const response = await deleteQuestionApi(questionId);
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || { message: "Failed to delete question" };
  }
};

export const getQuestionByLessonIndexService = async (lessonId, questionIndex) => {
  try {
    const response = await getQuestionByLessonIndexApi(lessonId, questionIndex);
    console.log("✅ API response:", response.data); // should match the JSON you posted
    return response.data; // ✅ NOT response.data.data
  } catch (err) {
    console.error("❌ Service error:", err);
    throw err.response?.data || { message: "Failed to fetch question" };
  }
};
