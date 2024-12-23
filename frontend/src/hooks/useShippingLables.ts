import { useMutation } from "@tanstack/react-query";
import { createShippingLabel } from "../services/shippingLables";

export const useCreateShippingLabel = () => useMutation({
  mutationFn: createShippingLabel,
  onSuccess: (data)=> {
    return {
      message: "Create shipping label successfully!",
      data,
    };
  },
  onError: (error) => {
    throw new Error(`Error creating the shipping label: ${error.message}`);
  }
});
