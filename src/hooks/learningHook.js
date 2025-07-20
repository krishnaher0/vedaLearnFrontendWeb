// hooks/admin/useLearnings.js
import { useQuery } from "@tanstack/react-query";
import { fetchLearningsByCourse } from "../services/learningService";

export const useLearningsByCourse = (courseId) => {
  return useQuery({
    queryKey: ["learnings", courseId],
    queryFn: () => fetchLearningsByCourse(courseId),
    enabled: !!courseId, // Only run if courseId is truthy
  });
};
