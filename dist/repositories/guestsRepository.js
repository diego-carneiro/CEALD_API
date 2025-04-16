"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGuestRepository = exports.GetGuestsRepository = void 0;
const mongo_1 = require("../database/mongo");
class GetGuestsRepository {
    async getGuests() {
        try {
            const guests = await mongo_1.MongoClient.db
                .collection("CEALD_Guests")
                .find({})
                .toArray();
            return guests.map(({ _id, ...rest }) => ({
                ...rest,
                id: _id.toHexString(),
            }));
        }
        catch (error) {
            console.error("Guest not registered:", error);
            throw error;
        }
    }
}
exports.GetGuestsRepository = GetGuestsRepository;
class CreateGuestRepository {
    async createGuest(params) {
        try {
            const { insertedId } = await mongo_1.MongoClient.db
                .collection("CEALD_Guests")
                .insertOne(params);
            const guest = await mongo_1.MongoClient.db
                .collection("CEALD_Guests")
                .findOne({ _id: insertedId });
            if (!guest) {
                throw new Error("Guest not registered");
            }
            const position = (await mongo_1.MongoClient.db
                .collection("CEALD_Guests")
                .countDocuments({ _id: { $lt: insertedId } })) + 1;
            const { _id, ...rest } = guest;
            return { id: _id.toHexString(), ...rest, position };
        }
        catch (error) {
            console.error("Guest not registered:", error);
            throw error;
        }
    }
}
exports.CreateGuestRepository = CreateGuestRepository;
