"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const mongo_1 = require("./database/mongo");
const PORT = Number(process.env.PORT) || 8000;
async function startServer() {
    try {
        await mongo_1.MongoClient.connect();
        index_1.default.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running at port ${PORT}.`);
        });
    }
    catch (err) {
        console.error("Erro ao conectar com o banco:", err);
        process.exit(1);
    }
}
startServer();
