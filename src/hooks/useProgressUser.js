import { useMutation,useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  enrollCourseApi,
  completeLessonApi,
  updateProgressApi,
  
} from '../api/userProgressApi';

export const useEnrollCourse = () => {
  return useMutation({
    mutationFn: ({ userId, courseId }) => enrollCourseApi(userId, courseId),
    mutationKey: ['enrollCourse'],
    onSuccess: (data) => {
      toast.success(data.message || 'Course enrolled successfully');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Enrollment failed');
    },
  });
};

export const useCompleteLesson = () => {
  return useMutation({
    mutationFn: (userId) => completeLessonApi(userId),
    mutationKey: ['completeLesson'],
    onSuccess: (data) => {
      toast.success(data.message || 'Lesson completed');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to complete lesson');
    },
  });
};

export const useUpdateProgress = () => {
  return useMutation({
    mutationFn: ({ userId, progressData }) => updateProgressApi(userId, progressData),
    mutationKey: ['updateProgress'],
    onSuccess: (data) => {
      toast.success(data.message || 'Progress updated');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to update progress');
    },
  });
};

// export const useFetchQuestionByIndex = ({ lessonId, questionIndex, userId }) => {
//   return useQuery({
//     queryKey: ['questionByIndex', lessonId, questionIndex, userId],
//     queryFn: () => fetchQuestionByIndexApi(lessonId, questionIndex, userId),
//     enabled: !!lessonId && questionIndex !== undefined && !!userId, // to avoid running before args are ready
//   });
// };