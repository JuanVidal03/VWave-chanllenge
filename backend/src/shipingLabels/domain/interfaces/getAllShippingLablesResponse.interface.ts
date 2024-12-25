import { ObjectId } from "mongodb";

export interface GetAllShippingLablesResponse {
  _id: ObjectId;
  shippingInfo: {
    shipmentNo: string,
    sstatus: unknown,
    shipmentRefNo: string,
    label: {
      b64: string,
      fileFormat: string,
      printFormat: string
    },
    validationMessages: [],
    routingCode: string
  };
  address: {
    country: string,
    city: string,
    postcode: string,
    district: null | string,
    street: string | null,
    housenumber: string | null,
    address_line1: string,
    address_line2: string,
  };
}
