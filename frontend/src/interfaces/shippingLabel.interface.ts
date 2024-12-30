import { Address } from "./address.interface";

export interface ShippingLabel {
  _id: string,
  shippingInfo: ShippingInfo;
  address: Address;
}

interface ShippingInfo {
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
}
