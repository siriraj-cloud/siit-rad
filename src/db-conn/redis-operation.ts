import { redisGetAsync, redisSetAsync } from "./redis-con";

type RedisObject<T> = {
  epochTime: number;
  payload: T;
};

export async function redisWriteJSON<T>({
  redisKey,
  expire_s,
  payload,
}: {
  redisKey: string;
  expire_s: number;
  payload: T;
}): Promise<void> {
  const currentDate = new Date();
  const writeObj: RedisObject<T> = {
    epochTime: currentDate.getTime(),
    payload: payload,
  };

  try {
    await redisSetAsync(redisKey, JSON.stringify(writeObj), "EX", expire_s);
  } catch (error) {
    console.error("redisWriteJSON()", error);
  }
}

type RedisReadJSONRes<T> =
  | { code: "OK"; payload: T; epochTime: number }
  | { code: "NOT_FOUND" }
  | { code: "ERROR"; message: string };

export async function redisReadJSON<T>({
  redisKey,
}: {
  redisKey: string;
}): Promise<RedisReadJSONRes<T>> {
  try {
    const getData = await redisGetAsync(redisKey);
    if (!getData) return { code: "NOT_FOUND" };
    const readObject: RedisObject<T> = JSON.parse(getData);
    return {
      code: "OK",
      payload: readObject.payload,
      epochTime: readObject.epochTime,
    };
  } catch (error) {
    console.error("redisReadJSON", error);
    return { code: "ERROR", message: error.message || error };
  }
}
