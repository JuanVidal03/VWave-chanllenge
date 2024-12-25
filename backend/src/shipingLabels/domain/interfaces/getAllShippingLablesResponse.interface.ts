import { ObjectId } from "mongodb";
import { GetAddressGeoapifyResponse } from "./getAddressGeoapifyResponse.interface";


export interface GetAllShippingLablesResponse {
  _id: ObjectId;
  shippingInfo: ShippingInfo;
  address: GetAddressGeoapifyResponse;
}

interface ShippingInfo {
  shipmentNo: string,
  sstatus: {
      "title": string,
      "status": number,
      "statusCode": number,
  },
  shipmentRefNo: string,
  label: {
      b64: string,
      fileFormat: StringConstructor,
      printFormat: string
  },
  validationMessages: [],
  routingCode: string,
}
