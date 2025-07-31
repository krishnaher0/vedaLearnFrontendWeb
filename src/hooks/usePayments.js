// hooks/usePayments.js
import { useQuery } from "@tanstack/react-query";
import { getAllPayments } from "../services/admin/paymentService";

export default function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getAllPayments,
    staleTime: 1000 * 60 * 5, // optional: 5 minutes cache
  });
}
