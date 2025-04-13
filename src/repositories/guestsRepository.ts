import { MongoClient } from "../database/mongo";
import {
  CreateGuestParams,
  Guest,
  ICreateGuestRepository,
  IGetGuestsRepository,
} from "../interfaces/guestsInterface";

export class GetGuestsRepository implements IGetGuestsRepository {
  async getGuests(): Promise<Guest[]> {
    const guests = await MongoClient.db
      .collection<Omit<Guest, "id">>("CEALD_Guests")
      .find({})
      .toArray();

    return guests.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}

export interface GuestWithPosition extends Guest {
  position: number;
}

export class CreateGuestRepository implements ICreateGuestRepository {
  async createGuest(params: CreateGuestParams): Promise<GuestWithPosition> {
    const { insertedId } = await MongoClient.db
      .collection("CEALD_Guests")
      .insertOne(params);

    const guest = await MongoClient.db
      .collection<Omit<Guest, "id">>("CEALD_Guests")
      .findOne({ _id: insertedId });

    if (!guest) {
      throw new Error("Guest not registered");
    }

    // Buscar a posição do convidado na lista, ordenada por _id (ordem de inserção)
    const position =
      (await MongoClient.db
        .collection("CEALD_Guests")
        .countDocuments({ _id: { $lt: insertedId } })) + 1;

    const { _id, ...rest } = guest;

    return { id: _id.toHexString(), ...rest, position };
  }
}
