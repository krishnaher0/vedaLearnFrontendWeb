import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAllTeacherService,
  registerTeacherService,
  updateTeacherService,
  deleteTeacherService,
} from "../../services/admin/TeacherService";


export const useGetTeacher = () =>
  useQuery({
    queryKey: ["admin_users"],
    queryFn: getAllTeacherService,
  });


export const useAddTeacher = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: registerTeacherService,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin_users"] }),
  });
};

export const useUpdateTeacher = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ teacherId, formData }) =>
      updateTeacherService(teacherId, formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin_users"] }),
  });
};

export const useDeleteTeacher = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTeacherService,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin_users"] }),
  });
};
