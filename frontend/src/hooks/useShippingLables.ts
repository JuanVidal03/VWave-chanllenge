import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { createShippingLabel, getAllShippingLabels, getAddressesToAutocomplete } from "../services/shippingLables";
import { queryClient } from "../App";
import { AxiosResponse } from "axios";
import { ShippingLabel } from "../interfaces/shippingLabel.interface";

export const useCreateShippingLabel = () => useMutation({
  mutationFn: createShippingLabel,
  onSuccess: (newShippingLabel: AxiosResponse<ShippingLabel>)=> {
    queryClient.setQueryData(["shippingLabels"], (oldShippingLabels: AxiosResponse) => {
      if (!oldShippingLabels) {
        return { data: [newShippingLabel] };
      }

      return {
        ...oldShippingLabels,
        data: [newShippingLabel.data, ...oldShippingLabels.data]
      };
    });
  },
  onError: (error: unknown) => {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error.");
    }
  }
});

export const useGetAllShippingLables = (): UseQueryResult<AxiosResponse> => useQuery({
  queryKey: ["shippingLabels"],
  queryFn: getAllShippingLabels,
});

export const useGetAddressesToComplete = (address: string): UseQueryResult<AxiosResponse> => useQuery({
  queryKey: ["getAllAddresses", address],
  queryFn: () => getAddressesToAutocomplete(address),
  enabled: !!address,
});
