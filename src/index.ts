require("dotenv").config();
import { closeConnection } from "./db-conn/db-inspectra";
import app from "./app";

const port = (process.env.NODE_PORT || 5035) as number;

const server = app.listen(port, () => {
  console.log(`Radiology DB service, port ${port}`);
});

process.on("SIGTERM", closeServer);
process.on("SIGINT", closeServer);
function closeServer(): void {
  server.close(async () => {
    await closeConnection();
    if (process.env.NODE_ENV !== "test" && process.env.CI !== "true")
      console.log("Closed out remaining connections");
    process.exit(0);
  });
}
