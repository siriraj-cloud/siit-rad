require("dotenv").config();
import { pgInspectra } from "../src/db-conn/db-inspectra";
import { db37AppointCon, db37PacsCon } from "../src/db-conn/db-radiology";

export default async (): Promise<void> => {
  await pgInspectra.authenticate();
  await db37PacsCon;
  await db37AppointCon;
};
