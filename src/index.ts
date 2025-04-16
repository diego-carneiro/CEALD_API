import express from "express";
import cors from "cors";
import { config } from "dotenv";
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

// Rotas
app.use(guestRoutes);

export default app;
