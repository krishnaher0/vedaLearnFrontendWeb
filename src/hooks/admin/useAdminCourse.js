// import { useMutation } from '@tanstack/react-query';
// import { toast } from 'react-toastify';
// import { createOneCourseApi } from '../../api/admin/courseApi'; // Make sure this path is correct

// export const useAddCourse = (refetch) => {
//   return useMutation({
//     mutationFn: (formData) => createOneCourseApi(formData),
//     mutationKey: ['add-course'],
//     onSuccess: (data) => {
//       toast.success(data?.message || 'Course added successfully.');
//       if (refetch) refetch();
//     },
//     onError: (error) => {
//       toast.error(error?.message || 'Failed to add course.');
//     },
//   });
// };
