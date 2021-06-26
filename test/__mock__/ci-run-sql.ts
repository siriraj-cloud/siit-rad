// Create mock data for GitHub action
require("dotenv").config();
import fs from "fs";
import path from "path";
import sql from "mssql";

const createDB = fs.readFileSync(
  path.join(__dirname, "./1-create-db.sql"),
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

    // Close connection
    await pool1.close();
    process.exit(0);
  } catch (err) {
    console.error("SQL error", err);
  }
})();
