import cron from "node-cron";
import dayjs from "dayjs";
import { MongoClient } from "../database/mongo";

export function scheduleGuestCleanup() {
  cron.schedule("0 0 * * 5", async () => {
    try {
      const result = await MongoClient.db
        .collection("CEALD_Guests")
        .deleteMany({});

      console.log(
        `[LIMPEZA AUTOMÁTICA] ${dayjs().format("DD/MM/YYYY HH:mm")} - Removidos: ${result.deletedCount}`
      );
    } catch (error) {
      console.error(
        `[ERRO NA LIMPEZA] ${dayjs().format("DD/MM/YYYY HH:mm")}:`,
        error
      );
    }
  });

  console.log("[CRON] Agendamento de limpeza semanal de guests ativado.");
}
