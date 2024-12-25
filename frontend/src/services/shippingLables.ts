import axios from "./axios";
import { CreateShippingLabel } from "../interfaces/createShippingLabel.interface";

export const createShippingLabel = async (shippingLabel: CreateShippingLabel) => {
  try {
    const response = await axios.post("/create-shipping-label", shippingLabel);

    if (response.status !== 201) {
      throw new Error(`Error: ${response.data}`);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(`Error creating shipping label: ${error.response}`);
  }
};

export const getAllShippingLabels = async () => {
  const response = await axios.get("/shipping-labels");
  if (response.status !== 200) {
    throw new Error(`Error: ${response.data}`);
  }
  return response.data;
};
