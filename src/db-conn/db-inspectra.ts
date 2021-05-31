import { Sequelize, SyncOptions } from "sequelize";

export const pgInspectra = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_INSPECTRA_HOST,
  port: Number(process.env.DB_INSPECTRA_PORT) || 5432,
  username: process.env.DB_INSPECTRA_USERNAME || "",
  password: process.env.DB_INSPECTRA_PASSWORD || "",
  database: process.env.DB_INSPECTRA_DATABASE_INSPECTRA || "",
  logging: false,
  sync: { force: false, alter: false },
  timezone: "+07:00",
});

export async function closeConnection(): Promise<void> {
  await pgInspectra.close();
  if (process.env.NODE_ENV !== "test")
    console.log("Close postgres connection success");
}

// Check ENV
if (
  !process.env.DB_INSPECTRA_HOST ||
  !process.env.DB_INSPECTRA_PORT ||
  !process.env.DB_INSPECTRA_USERNAME ||
  !process.env.DB_INSPECTRA_PASSWORD ||
  !process.env.DB_INSPECTRA_DATABASE_INSPECTRA ||
  !process.env.DB_INSPECTRA_DATABASE_INSPECTRA_SCHEMA
)
  console.error("Missing Postgres ENV variables");
