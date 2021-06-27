import fs from "fs";
import path from "path";
import pg from "pg";

const config: pg.PoolConfig = {
  host: process.env.DB_INSPECTRA_HOST,
  user: process.env.DB_INSPECTRA_USERNAME,
  database: process.env.DB_INSPECTRA_DATABASE_INSPECTRA,
  password: process.env.DB_INSPECTRA_PASSWORD,
  port: Number(process.env.DB_INSPECTRA_PORT),
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("Connected to inspectra test database");
});

/*  */

const createTable1 = fs.readFileSync(
  path.join(__dirname, "./2-create-inspectra.sql"),
  "utf8",
);

const insertCIScore = fs.readFileSync(
  path.join(__dirname, "./3-insert-inspectra-postgres.sql"),
  "utf8",
);

(async function () {
  try {
    await pool.query(createTable1);
    await pool.query(insertCIScore);
    console.log("Insert mock data success.");
    await pool.end();
  } catch (error) {
    console.error("SQL error, postgres", error);
  }
})();
