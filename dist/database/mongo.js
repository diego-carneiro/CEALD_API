"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoClient = void 0;
const mongodb_1 = require("mongodb");
exports.MongoClient = {
    client: undefined,
    db: undefined,
    async connect() {
        const URL = process.env.MONGODB_URL || "";
        const client = new mongodb_1.MongoClient(URL);
        const db = client.db("CEALD_Guests");
        this.client = client;
        this.db = db;
    },
};
