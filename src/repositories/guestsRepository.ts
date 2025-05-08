import { MongoClient } from "../database/mongo";
import {
  CreateGuestParams,
  Guest,
  ICreateGuestRepository,
  IGetGuestsRepository,
} from "../interfaces/guestsInterface";

export class GetGuestsRepository implements IGetGuestsRepository {
  async getGuests(): Promise<Guest[]> {
    try {
      const guests = await MongoClient.db
        .collection<Omit<Guest, "id">>("CEALD_Guests")
        .find({})
        .toArray();

      return guests.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toHexString(),
      }));
    } catch (error) {
      console.error("Guest not registered:", error);
      throw error;
    }
  }
}

export interface GuestWithPosition extends Guest {
  position: number;
}

export class CreateGuestRepository implements ICreateGuestRepository {
  async createGuest(params: CreateGuestParams): Promise<GuestWithPosition> {
    try {
      const { phoneNumber } = params;

      // Verificar se já existe um convidado com o mesmo phoneNumber
      const existing = await MongoClient.db
        .collection("CEALD_Guests")
        .findOne({ phoneNumber });

      if (existing) {
        throw new Error("Guest with this phone number already exists");
      }

      // Inserir o novo convidado
      const { insertedId } = await MongoClient.db
        .collection("CEALD_Guests")
        .insertOne(params);

      const guest = await MongoClient.db
        .collection<Omit<Guest, "id">>("CEALD_Guests")
        .findOne({ _id: insertedId });

      if (!guest) {
        throw new Error("Guest not registered");
      }

      const position =
        (await MongoClient.db
          .collection("CEALD_Guests")
          .countDocuments({ _id: { $lt: insertedId } })) + 1;

      const { _id, ...rest } = guest;

      return { id: _id.toHexString(), ...rest, position };
    } catch (error) {
      console.error("Guest not registered:", error);
      throw error;
    }
  }
}
