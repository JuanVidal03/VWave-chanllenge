import { ObjectId } from "mongodb";

export interface CreateShippingLabelInDb {
  acknowledged: boolean;
  insertedId: ObjectId;
}
