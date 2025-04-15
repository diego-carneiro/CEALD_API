"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const mongo_1 = require("./database/mongo");
const PORT = Number(process.env.PORT) || 8000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongo_1.MongoClient.connect();
            _1.default.listen(PORT, "0.0.0.0", () => {
                console.log(`Server running at port ${PORT}.`);
            });
        }
        catch (err) {
            console.error("Erro ao conectar com o banco:", err);
            process.exit(1);
        }
    });
}
startServer();
