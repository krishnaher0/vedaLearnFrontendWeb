import {  useQuery } from "@tanstack/react-query";
// useQuery -> GET request states
import { useState } from "react";
import { getAllTeacherService } from "../../services/admin/TeacherService";
export const useAdminTeacher = () => {
  const query = useQuery({
    queryKey: ["admin_users"],
    queryFn:
      getAllTeacherService
   
  });
    return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
