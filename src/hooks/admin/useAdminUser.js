import {  useQuery } from "@tanstack/react-query";
// useQuery -> GET request states

import { getAllUserService } from "../../services/admin/UserService";
import { useMutation } from '@tanstack/react-query';
import { updateOneUserService } from "../../services/admin/UserService"
import { toast } from 'react-toastify';
export const useAdminUser = () => {
  const query = useQuery({
    queryKey: ["admin_users"],
    queryFn:
      getAllUserService
   
  });
    return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
export const useAdminUpdateTeacher = () => {
  const query = useQuery({
    queryKey: ["admin_users"],
    queryFn:
      updateOneTeacherApi
   
  });
    return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useUpdateUser = (onSuccessCallback) => {
  return useMutation({
    mutationFn: ({ id, data }) => updateOneUserService({ id, data }),

    onSuccess: (res) => {
      toast.success(res?.message || "User updated successfully");
      if (onSuccessCallback) onSuccessCallback(res);
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to update user");
    },
  });
};
