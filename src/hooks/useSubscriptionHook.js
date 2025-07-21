import { useMutation } from "@tanstack/react-query";
import { initiateEsewaPaymentService } from "../services/subscriptionService";

export const useEsewaPayment = () => {
  return useMutation({
    mutationFn: initiateEsewaPaymentService,
  });
};
