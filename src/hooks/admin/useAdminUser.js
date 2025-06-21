import {  useQuery } from "@tanstack/react-query";
// useQuery -> GET request states
import { useState } from "react";
import { getAllUserService } from "../../services/admin/userService";
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
