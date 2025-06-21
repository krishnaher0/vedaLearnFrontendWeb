import {  useQuery } from "@tanstack/react-query";
// useQuery -> GET request states
import { useState } from "react";
import { getAllUserService } from "../../services/admin/UserService";
import { updateOneTeacherApi } from "../../api/admin/teacherApi";
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
