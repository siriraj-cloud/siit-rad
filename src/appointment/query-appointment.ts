import { scheduleQueryStr, ScheduleTable } from "./type-table-schedule";
import { db37AppointCon, db37AppointPool } from "../db-conn/db-radiology";
import sql from "mssql";
import { trimStringGeneric } from "../utils/fn-trim";
import { addTimezone, sortByDate } from "./fn-appointment";

type QueryAppointment =
  | {
      code: "OK";
      payload: ScheduleTable[];
    }
  | { code: "NOT_FOUND" }
  | { code: "ERROR"; message: string };

export async function queryAppointment({
  hn,
}: {
  hn: string;
}): Promise<QueryAppointment> {
  try {
    await db37AppointCon;
    const query: sql.IResult<ScheduleTable> = await db37AppointPool
      .request()
      .input("hn", sql.VarChar, hn)
      .query(scheduleQueryStr);
    if (query && query.rowsAffected[0] > 0) {
      const trim = trimStringGeneric<ScheduleTable>(query.recordset);
      const addTz = addTimezone<ScheduleTable>(trim);
      return { code: "OK", payload: addTz.sort(sortByDate) };
    } else {
      return { code: "NOT_FOUND" };
    }
  } catch (error) {
    return { code: "ERROR", message: error.message || error };
  }
}
