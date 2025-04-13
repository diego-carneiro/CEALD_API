import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const URL = process.env.MONGODB_URL || "";

    const client = new Mongo(URL);
    const db = client.db("CEALD_Guests");

    this.client = client;
    this.db = db;
  },
};
