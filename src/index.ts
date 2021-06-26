require("dotenv").config();
import { closeConnection } from "./db-conn/db-inspectra";
import app from "./app";
import { db37PacsPool, db37AppointPool } from "./db-conn/db-radiology";
import { redisEnd } from "./db-conn/redis-con";

const port = (process.env.NODE_PORT || 5035) as number;

const server = app.listen(port, () => {
  console.log(`Radiology DB service, port ${port}`);
});

process.on("SIGTERM", closeServer);
process.on("SIGINT", closeServer);
function closeServer(): void {
  server.close(async () => {
    await closeConnection();
    await db37PacsPool.close();
    await db37AppointPool.close();
    await redisEnd();
    if (process.env.NODE_ENV !== "test" && process.env.CI !== "true")
      console.log("Closed out remaining connections");
    process.exit(0);
  });
}
