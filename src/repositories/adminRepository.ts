import { MongoClient } from "../database/mongo";
import { AdminParams } from "../interfaces/adminInterface";

export class AdminRepository {
  async checkPassword(password: string): Promise<boolean> {
    const result = await MongoClient.db
      .collection<AdminParams>("Admin_Password")
      .findOne({ password });

    return !!result;
  }
}
