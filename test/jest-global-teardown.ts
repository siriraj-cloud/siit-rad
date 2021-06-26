require("dotenv").config();
import { closeConnection, pgInspectra } from "../src/db-conn/db-inspectra";
import { redisEnd } from "../src/db-conn/redis-con";
import { db37PacsPool, db37AppointPool } from "../src/db-conn/db-radiology";

export default async (): Promise<void> => {
  try {
    await pgInspectra.authenticate();
    await closeConnection();
    await redisEnd();
    await db37PacsPool.close();
    await db37AppointPool.close();
  } catch (_error) {
    return;
  }
};

// TODO: GitHub CI process not exit after ran all tests
