import app from ".";
import { MongoClient } from "./database/mongo";

const PORT = Number(process.env.PORT) || 8000;

async function startServer() {
  try {
    await MongoClient.connect();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at port ${PORT}.`);
    });
  } catch (err) {
    console.error("Erro ao conectar com o banco:", err);
    process.exit(1);
  }
}

startServer();
