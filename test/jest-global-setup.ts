require("dotenv").config();
import { pgInspectra } from "../src/db-conn/db-inspectra";
import { db37AppointCon, db37PacsCon } from "../src/db-conn/db-radiology";
// import { runCIDatabase } from "./__mock__/ci-run-sql";

export default async (): Promise<void> => {
  await pgInspectra.authenticate();
  await db37PacsCon;
  await db37AppointCon;
  // if (process.env.CI === "true") await runCIDatabase();
};
