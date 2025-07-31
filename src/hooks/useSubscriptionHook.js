import { useMutation,useQuery } from "@tanstack/react-query";
import { initiateEsewaPaymentService,getUserSubscriptionsService } from "../services/subscriptionService";

export const useEsewaPayment = () => {
  return useMutation({
    mutationFn: initiateEsewaPaymentService,
  });
};

export const useGetUserSubscriptions = () =>
  useQuery({
    queryKey: ["user_subscriptions"],
    queryFn: getUserSubscriptionsService,
  });
