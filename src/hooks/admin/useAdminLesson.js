import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLessonsByCourseService,
  createLessonService,
  updateLessonService,
  deleteLessonService,
} from "../../services/admin/lessonService";
import { toast } from "react-hot-toast";

export const useGetLessonsByCourse = (courseId) => {
  return useQuery({
    queryKey: ["lessons", courseId],
    queryFn: () => getLessonsByCourseService(courseId),
    enabled: !!courseId,
  });
};



export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createLesson"],
    mutationFn: createLessonService,
    onSuccess: (data) => {
      toast.success(data.message || "Lesson created successfully");
      queryClient.invalidateQueries(["lessons"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create lesson");
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateLesson"],
    mutationFn: ({ lessonId, lessonData }) => updateLessonService(lessonId, lessonData),
    onSuccess: (data) => {
      toast.success(data.message || "Lesson updated successfully");
      queryClient.invalidateQueries(["lessons"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update lesson");
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteLesson"],
    mutationFn: deleteLessonService,
    onSuccess: (data) => {
      toast.success(data.message || "Lesson deleted successfully");
      queryClient.invalidateQueries(["lessons"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete lesson");
    },
  });
};
