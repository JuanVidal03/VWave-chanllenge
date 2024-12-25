import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { createShippingLabel, getAllShippingLabels } from "../services/shippingLables";
import { queryClient } from "../App";
import { GetShippingLabelsResponse } from "../interfaces/getAllShippingLabelsResponse.interface";

export const useCreateShippingLabel = () => useMutation({
  mutationFn: createShippingLabel,
  onSuccess: (newShippingLabel)=> {
    queryClient.setQueryData(["shippingLabels"], (oldShippingLabels: any) => {
      if (!oldShippingLabels) {
        return { data: [newShippingLabel] };
      }
      return {
        ...oldShippingLabels,
        data: [newShippingLabel, ...oldShippingLabels.data]
      };
    });
  },
  onError: (error: unknown) => {
    if (error instanceof Error) {
      throw new Error(`Error creating the shipping label: ${error.message}`);
    } else {
      throw new Error("Unknown error.");
    }
  }
});

export const useGetAllShippingLables = (): UseQueryResult<GetShippingLabelsResponse[]> => useQuery({
  queryKey: ["shippingLabels"],
  queryFn: getAllShippingLabels,
});
