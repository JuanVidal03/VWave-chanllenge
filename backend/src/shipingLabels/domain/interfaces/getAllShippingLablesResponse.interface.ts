import { ObjectId } from "mongodb";

export interface GetAllShippingLablesResponse {
  _id: ObjectId;
  shippingInfo: {
    label: {
      b64: string;
      fileFormat: string;
      printFormat: string;
    };
    routingCode: string;
    shipmentNo: string;
    shipmentRefNo: string;
    sstatus: {
      title: string;
      status: number;
      statusCode: 200
    };
    validationMessages: [];
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
