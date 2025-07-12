import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuestionsService,
  getQuestionsByLessonService,
  getQuestionByIdService,
  createQuestionService,
  createQuestionsBatchService,
  updateQuestionService,
  deleteQuestionService,
} from "../../services/admin/QuestionService";
import { toast } from "react-hot-toast";

// 🟢 Get all questions (with optional filters)
export const useGetQuestions = (params) => {
  return useQuery({
    queryKey: ["questions", params],
    queryFn: () => getQuestionsService(params),
    enabled: !!params,
  });
};

// 🔵 Get questions by lesson
export const useGetQuestionsByLesson = (lessonId) => {
  return useQuery({
    queryKey: ["questionsByLesson", lessonId],
    queryFn: () => getQuestionsByLessonService(lessonId),
    enabled: !!lessonId,
  });
};

// 🟠 Get single question by ID
export const useGetQuestionById = (questionId) => {
  return useQuery({
    queryKey: ["question", questionId],
    queryFn: () => getQuestionByIdService(questionId),
    enabled: !!questionId,
  });
};

// ✅ Create single question
export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createQuestion"],
    mutationFn: createQuestionService,
    onSuccess: (data) => {
      toast.success(data.message || "Question created successfully");
      queryClient.invalidateQueries(["questions"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create question");
    },
  });
};

// ✅ Create batch of questions
export const useCreateQuestionsBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createQuestionsBatch"],
    mutationFn: createQuestionsBatchService,
    onSuccess: (data) => {
      toast.success(data.message || "Questions batch created successfully");
      queryClient.invalidateQueries(["questions"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create questions batch");
    },
  });
};

// 🟠 Update question
export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateQuestion"],
    mutationFn: ({ questionId, questionData }) => updateQuestionService(questionId, questionData),
    onSuccess: (data) => {
      toast.success(data.message || "Question updated successfully");
      queryClient.invalidateQueries(["questions"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update question");
    },
  });
};

// 🔴 Delete question
export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteQuestion"],
    mutationFn: deleteQuestionService,
    onSuccess: (data) => {
      toast.success(data.message || "Question deleted successfully");
      queryClient.invalidateQueries(["questions"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete question");
    },
  });
};

