import redis, { ClientOpts, RedisClient } from "redis";
import { promisify } from "util";

const redisConf: ClientOpts = {
  host: process.env.REDIS_HOST || "localhost",
  port: (process.env.REDIS_PORT || 6379) as number,
  password: process.env.REDIS_PASSWORD || undefined,
};

let redisClient: RedisClient = redis.createClient({
  ...redisConf,
  retry_strategy: (_options) => {
    redisClient = redis.createClient(redisConf);
    return new Error("Retry attempts exhausted");
  },
});

redisClient.on("connect", () => {
  if (process.env.NODE_ENV !== "test" && process.env.CI !== "true")
    console.log("Redis connected");
});

redisClient.on("error", (error) => {
  if (error.code === "CONNECTION_BROKEN")
    return console.log("!!! Redis connection broken !!!");
  return console.log("Redis error, ", error.code || JSON.stringify(error));
});

/*  */
const redisGetAsync: {
  (key: string): Promise<string | null>;
} = promisify(redisClient.get).bind(redisClient);

/*  */

const redisSetAsync: {
  (key: string, data: string, exType: string, exp: number): Promise<unknown>;
} = promisify(redisClient.set).bind(redisClient);

/*  */

const redisTtlAsync: { (key: string): Promise<number> } = promisify(
  redisClient.ttl,
).bind(redisClient);

/*  */

const redisDelAsync: {
  (key: string): Promise<number>;
} = promisify(redisClient.del).bind(redisClient);

/*  */

export async function redisEnd() {
  await new Promise<void>((resolve) => {
    redisClient.quit(() => {
      resolve();
    });
  });
  await new Promise((resolve) => setImmediate(resolve));
}

/*  */

export { redisGetAsync, redisSetAsync, redisTtlAsync, redisDelAsync };

if (
  process.env.REDIS_HOST === undefined ||
  process.env.REDIS_PORT === undefined ||
  process.env.REDIS_PASSWORD === undefined
)
  console.error("Redis ENV undefined");
