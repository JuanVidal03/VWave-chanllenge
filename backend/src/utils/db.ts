import { MongoClient, Db } from "mongodb";
import { config } from "dotenv";

config();
const dbName = process.env.DB_NAME as string;
const url = process.env.DB_URL as string;
const client = new MongoClient(url);

export const dbConnection = async():Promise<Db> => {
  try {
    await client.connect();

    const db:Db = client.db(dbName);
    console.log("<< DB connected successfully >>");

    return db;
  } catch (error: any) {
    throw new Error(`Error trying connecting the db: ${error.message}`);
  }
}
