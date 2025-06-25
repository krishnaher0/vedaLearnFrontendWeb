import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import { createOneCourseApi,getAllCoursesApi,updateOneCourseApi,deleteOneCourseApi } from '../../api/admin/courseApi'; // Make sure this path is correct

export const useAddCourse = (refetch) => {
  return useMutation({
    mutationFn: (formData) => createOneCourseApi(formData),
    mutationKey: ['add-course'],
    onSuccess: (data) => {
      toast.success(data?.message || 'Course added successfully.');
      if (refetch) refetch();
    },
    onError: (error) => {
      toast.error(error?.message || 'Failed to add course.');
    },
  });
};
export const useUpdateCourse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, formData }) =>
      updateOneCourseApi(courseId, formData),
    mutationKey: ['update-course'],
    onSuccess: (data) => {
      toast.success(data?.message || "Course updated successfully.");
      qc.invalidateQueries({ queryKey: ["admin_courses"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update course.");
    },
  });
};
export const useDeleteCourse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteOneCourseApi,
    mutationKey: ['delete-course'],
    onSuccess: (data) => {
      toast.success(data?.message || "Course deleted successfully.");
      qc.invalidateQueries({ queryKey: ["admin_courses"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete course.");
    },
  });
};
export const useGetCourses = () =>
  useQuery({
    queryKey: ["admin_courses"],
    queryFn: getAllCoursesApi,
  });
