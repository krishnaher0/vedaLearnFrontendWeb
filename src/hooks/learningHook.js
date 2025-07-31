// hooks/admin/useLearnings.js
import { useQuery,useQueryClient ,useMutation} from "@tanstack/react-query";
import { createLearningService, deleteLearningService, fetchLearningsByCourse, updateLearningService } from "../services/learningService";

export const useLearningsByCourse = (courseId) => {
  return useQuery({
    queryKey: ["learnings", courseId],
    queryFn: () => fetchLearningsByCourse(courseId),
    enabled: !!courseId, // Only run if courseId is truthy
  });
};

export const useCreateLearning = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLearningService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learnings"] });
    },
  });
};

export const useUpdateLearning = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => updateLearningService(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learnings"] });
    },
  });
};

export const useDeleteLearning = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLearningService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learnings"] });
    },
  });
};
