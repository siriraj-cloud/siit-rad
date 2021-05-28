import sql from "mssql";

export const db37PacsPool = new sql.ConnectionPool({
  server: process.env.DB_RAD_37_IP || "localhost",
  user: process.env.DB_RAD_37_USERNAME,
  port: Number(process.env.DB_RAD_37_PORT) || undefined,
  password: process.env.DB_RAD_37_PASSWORD,
  database: process.env.DB_RAD_37_DATABASE_TSTUDYTAB,
  options: { enableArithAbort: true, encrypt: false },
});

export const db37PacsCon = db37PacsPool.connect().then((e) => {
  if (process.env.NODE_ENV !== "test" && process.env.CI !== "true")
    console.info("SQL server .37 connected");
  return e;
});

/* */

if (
  process.env.DB_RAD_37_IP === undefined ||
  process.env.DB_RAD_37_PORT === undefined ||
  process.env.DB_RAD_37_USERNAME === undefined ||
  process.env.DB_RAD_37_PASSWORD === undefined ||
  process.env.DB_RAD_37_DATABASE_TSTUDYTAB === undefined ||
  process.env.DB_RAD_37_DATABASE_TSTUDYTAB_SCHEMA === undefined
)
  console.error("Missing Database ENV configuration.");
