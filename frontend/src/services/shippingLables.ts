import axios from "./axios";
import { CreateShippingLabel } from "../interfaces/createShippingLabel.interface";
import { ShippingLabel } from "../interfaces/shippingLabel.interface";
import { AxiosResponse } from "axios";

export const createShippingLabel = async (
  shippingLabel: CreateShippingLabel
): Promise<AxiosResponse<ShippingLabel>> => {
  try {
    const response = await axios.post("/create-shipping-label", shippingLabel);

    if (response.status !== 201) {
      throw new Error(`Error: ${response.data}`);
    }

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error creating the shipping label.");
  }
};

export const getAllShippingLabels = async (): Promise<AxiosResponse<ShippingLabel[]>> => {
  const response = await axios.get("/shipping-labels");
  if (response.status !== 200) {
    throw new Error(`Error: ${response.data}`);
  }

  return response.data;
};

export const getAddressesToAutocomplete = async(address: string): Promise<AxiosResponse<ShippingLabel[] | ShippingLabel>> => {
  const response = await axios.get(`/address-autocomplete/${address}`);
  if (response.status !== 200) {
    throw new Error(`Error: ${response.data}`);
  }

  return response.data;
};
