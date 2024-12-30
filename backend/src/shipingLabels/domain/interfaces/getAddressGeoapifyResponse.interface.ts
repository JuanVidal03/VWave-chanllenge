export interface GetAddressGeoapifyResponse{
  country: string;
  city: string;
  postcode: string;
  district: string | null;
  street: string | null;
  housenumber: string | null;
  address_line1: string;
  address_line2: string;
  state?: string;
}
