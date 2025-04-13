import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import guestRoutes from "./routes/guests.routes";

config();

const app = express();

app.use(
  cors({
    origin: "https://ceald-web-app.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Conectar ao MongoDB
const dbConnection = async () => {
  await MongoClient.connect();
};

dbConnection();

app.use(guestRoutes);

export default app;
