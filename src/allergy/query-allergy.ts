import sql from "mssql";
import { db37PacsCon, db37PacsPool } from "../db-conn/db-radiology";
import { trimStringGeneric } from "../utils/fn-trim";
import { AllergyQueryRaw, allergyQueryStr } from "./type-allergy";
import CONFIG from "../utils/config";
import { redisReadJSON, redisWriteJSON } from "../db-conn/redis-operation";

type QueryRadAllergyRes =
  | {
      code: "OK";
      payload: AllergyQueryRaw[];
    }
  | { code: "NOT_FOUND" }
  | { code: "ERROR"; message: string };

const redisKeyGen = (hn: string) => CONFIG.Allergy.redis.table_list_key + hn;
const testEnv = process.env.NODE_ENV === "test" || process.env.CI === "true";

export async function queryRadAllergy({
  hn,
}: {
  hn: string;
}): Promise<QueryRadAllergyRes> {
  const readCache = await redisReadJSON<AllergyQueryRaw[]>({
    redisKey: redisKeyGen(hn),
  });
  if (readCache.code === "OK")
    return { code: "OK", payload: readCache.payload };

  try {
    await db37PacsCon;
    const query: sql.IResult<AllergyQueryRaw> = await db37PacsPool
      .request()
      .input("hn", sql.VarChar, hn)
      .query(allergyQueryStr);
    if (query && query.rowsAffected[0] > 0) {
      const trim = trimStringGeneric<AllergyQueryRaw>(query.recordset);

      if (!testEnv)
        redisWriteJSON<AllergyQueryRaw[]>({
          redisKey: redisKeyGen(hn),
          expire_s: CONFIG.Allergy.redis.expire_s,
          payload: trim,
        });

      return { code: "OK", payload: trim };
    } else {
      return { code: "NOT_FOUND" };
    }
  } catch (error) {
    console.error("queryRadAllergy()", error);
    return { code: "ERROR", message: error.message || error };
  }
}
