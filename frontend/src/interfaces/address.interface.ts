export interface Address {
  address_line1: string;
  address_line2: string;
  city: string;
  country: string;
  district: string | null;
  housenumber: string | null;
  postcode: string;
  street: string | null
}