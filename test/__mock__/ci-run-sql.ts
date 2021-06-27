// Create mock data for GitHub action
require("dotenv").config();
import fs from "fs";
import sql from "mssql";
import path from "path";

const createDB = fs.readFileSync(
  path.join(__dirname, "./1-create-db.sql"),
  "utf8",
);

const createTable1 = fs.readFileSync(
  path.join(__dirname, "./2-create-table-TStudy.sql"),
  "utf8",
);
const createTable2 = fs.readFileSync(
  path.join(__dirname, "./2-create-table-Appoint.sql"),
  "utf8",
);

const insertPacplusmaster =
  fs.readFileSync(path.join(__dirname, "./3-insert-risevent.sql"), "utf8") +
  fs.readFileSync(path.join(__dirname, "./3-insert-TStudy.sql"), "utf8");

const insertAppoint = fs.readFileSync(
  path.join(__dirname, "./3-insert-appoint.sql"),
  "utf8",
);

// async/await style:
const pool1 = new sql.ConnectionPool({
  server: process.env.DB_RAD_37_IP ?? "",
  user: process.env.DB_RAD_37_USERNAME,
  port: Number(process.env.DB_RAD_37_PORT) || undefined,
  password: process.env.DB_RAD_37_PASSWORD,
  options: { enableArithAbort: true, encrypt: false },
});

const pool1_conn = pool1.connect();

(async function runCIDatabase() {
  try {
    await pool1_conn;
    const request = pool1.request();
    await request.query(createDB);
    await request.query(createTable1 + createTable2);
    await request.query(insertPacplusmaster);
    await request.query(insertAppoint);
    console.log("Insert mock data success.");
    await pool1.close();
    process.exit(0);
  } catch (err) {
    console.error("SQL error", err);
  }
})();
