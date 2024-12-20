import axios from "axios";
import { config } from "dotenv";
import { GenerateAuthTokenResponse } from "../domain/interfaces/generateAuthToken.interface";

config();
const DHLBaseApi = process.env.DHL_API_URL as string;
const username = process.env.DHL_USER as string;
const password = process.env.DHL_PASSWORD as string;
const clientId = process.env.DHL_API_KEY as string;
const clientSecret = process.env.DHL_API_SECRET as string;

export const generateAuthToken = async():Promise<GenerateAuthTokenResponse> => {
  const payload = {
    grant_type: "password",
    username: username,
    password: password,
    client_id: clientId,
    client_secret: clientSecret,
  };

  const response = await axios.post(
    `${DHLBaseApi}/account/auth/ropc/v1/token`,
    new URLSearchParams(payload).toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
  });

  return response.data;
}
