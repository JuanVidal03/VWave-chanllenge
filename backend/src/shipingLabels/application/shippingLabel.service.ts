import axios from "axios";
import { config } from "dotenv";
import { GenerateAuthTokenResponse } from "../domain/interfaces/generateAuthToken.interface";
import { GenerateTokenPayload } from "../domain/interfaces/generateTokenPayload.interface";
import { dbConnection } from "../../utils/db";
import { GetAddressGeoapifyResponse } from "../domain/interfaces/getAddressGeoapifyResponse.interface";
import { CreateShippingLabelInDb } from "../domain/interfaces/createShippingLabelInDb.interface";
import { ObjectId } from "mongodb";
import crypto from 'crypto';

config();
// DHL api information
const DHLBaseApi = process.env.DHL_API_URL as string;
const username = process.env.DHL_USER as string;
const password = process.env.DHL_PASSWORD as string;
const clientId = process.env.DHL_API_KEY as string;
const clientSecret = process.env.DHL_API_SECRET as string;
// Geoapify api information
const geoapifyApiKey = process.env.GEOAPIFY_API_KEY as string;
const geoapifyApiUrl = process.env.GEOAPIFY_API_URL as string;

export const generateAuthToken = async():Promise<GenerateAuthTokenResponse> => {
  const payload: GenerateTokenPayload = {
    grant_type: "password",
    username: username,
    password: password,
    client_id: clientId,
    client_secret: clientSecret,
  };

  try {
    const response = await axios.post(
      `${DHLBaseApi}/account/auth/ropc/v1/token`,
      payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      },
    });
  
    return response.data;
  } catch (error: any) {
    throw new Error(`Error generating the token. Error: ${error.message}`);
  }

}

export const getAddressByGeoapify = async(address: string): Promise<GetAddressGeoapifyResponse> => {
  try {
    const response: any = await axios.get(`${geoapifyApiUrl}`, {
        params: {
          text: address,
          format: 'json',
          apiKey: geoapifyApiKey,
          filter: 'countrycode:de',
        }
    });

    const addressData = response.data.results[0];

    // getting just the needed data
    const addressInfo: GetAddressGeoapifyResponse = {
      country: addressData.country,
      city: addressData.city,
      postcode: addressData.postcode,
      district: addressData.district,
      street: addressData.street,
      housenumber: addressData.housenumber,
      address_line1: addressData.address_line1,
      address_line2: addressData.address_line2,
    }

    return addressInfo;
  } catch (error: any) {
    throw new Error(`Error fetch the address from Geoapify, Error: ${error.message}`);
  }
}

export const createShippingLabel = async(shippingLabel: string): Promise<ObjectId> => {
  const token: GenerateAuthTokenResponse = await generateAuthToken();

  if (!token.access_token) {
    throw new Error('No token found.'); 
  }
  
  const address: GetAddressGeoapifyResponse = await getAddressByGeoapify(shippingLabel);

  if (!address) {
    throw new Error('No address found.');
  }

  const payload ={
    profile: "STANDARD_GRUPPENPROFIL",
    shipments: [
      {
        product: "V01PAK",
        billingNumber: "33333333330102",
        refNo: "Order No. 1234",
        shipper: {
          name1: "My Online Shop GmbH",
          addressStreet: "Sträßchensweg 10",
          additionalAddressInformation1: "2. Etage",
          postalCode: "53113",
          city: "Bonn",
          country: "DEU",
          email: "max@mustermann.de",
          phone: "+49 123456789",
        },
        consignee: {
          name1: "Maria Musterfrau",
          addressStreet: `${address.address_line1}`,
          postalCode: `${address.postcode}`,
          city: `${address.city}`,
          country: "DEU",
          email: "maria@musterfrau.de",
          phone: "+49 987654321",
        },
        details: {
          dim: {
            uom: "mm",
            height: 100,
            length: 200,
            width: 150,
          },
          weight: {
            uom: "g",
            value: 500,
          },
        },
      },
    ],
  }

  try {
    const query = await axios.post(`${DHLBaseApi}/shipping/v2/orders`, payload, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Accept: "application/json", "Content-Type": "application/json",
      }
    });

    const db = dbConnection();
    const shippingLabelsCollection = (await db).collection('shippingLabels');
    const shippingLabelCreated: CreateShippingLabelInDb = await shippingLabelsCollection.insertOne({
      shippingInfo: query.data.items[0],
      address: address, 
    });
    
    return shippingLabelCreated.insertedId;
  } catch (error: any) {
    throw new Error(`Error creating shipping label: ${error.message}`);
  }
}
