"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const guests_routes_1 = __importDefault(require("./routes/guests.routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://ceald-web-app.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
// Rotas
app.use(guests_routes_1.default);
exports.default = app;
