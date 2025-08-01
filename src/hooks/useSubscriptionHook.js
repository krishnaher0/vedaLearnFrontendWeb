import { useMutation,useQuery } from "@tanstack/react-query";
import { initiateEsewaPaymentService,getUserSubscriptionsService } from "../services/subscriptionService";
import { toast } from 'react-toastify';
export const useEsewaPayment = () => {
  return useMutation({
    mutationFn: initiateEsewaPaymentService,
    onSuccess: (data) => {
      toast.success("✅ Esewa payment initiated successfully!");
    },
    onError: (error) => {
      toast.error("❌ Failed to initiate Esewa payment.");
    },
  });
};
export const useGetUserSubscriptions = () =>
  useQuery({
    queryKey: ["user_subscriptions"],
    queryFn: getUserSubscriptionsService,
  });
