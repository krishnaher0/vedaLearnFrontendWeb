import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPlansService,
  getPlanByIdService,
  createPlanService,
  updatePlanService,
  deletePlanService,
} from "../../services/admin/planService";

// 🟢 Fetch all plans
export const usePlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getPlansService,
  });
};

// 🔍 Fetch a single plan
export const usePlan = (id) => {
  return useQuery({
    queryKey: ["plan", id],
    queryFn: () => getPlanByIdService(id),
    enabled: !!id,
  });
};

// ➕ Create plan
export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlanService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};

// 📝 Update plan
export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePlanService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};

// ❌ Delete plan
export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePlanService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};
