import sql from "mssql";
import { db37PacsCon, db37PacsPool } from "../db-conn/db-radiology";
import { trimStringTStudyTab1 } from "../fn";
import { prepareReport } from "./report-prepare";
import { TStudyTabRes1 } from "./type-report";

type QueryRadReportRes =
  | {
      code: "OK";
      payload: TStudyTabRes1[];
    }
  | { code: "NOT_FOUND" }
  | { code: "ERROR"; message: string };
type QueryRadReportProps = { hn: string };
export async function queryRadReport({
  hn,
}: QueryRadReportProps): Promise<QueryRadReportRes> {
  try {
    await db37PacsCon;
    const request = db37PacsPool.request();
    const query: sql.IResult<TStudyTabRes1> = await request
      .input("hn", sql.VarChar, hn)
      .query(queryStr);
    if (query && query.rowsAffected[0] > 0) {
      const trim = trimStringTStudyTab1(query.recordset);
      const prepare = prepareReport({ record: trim, UserType: "" });
      return { code: "OK", payload: trim };
    } else {
      return { code: "NOT_FOUND" };
    }
  } catch (error) {
    // console.error("queryRadReport()", error);
    return { code: "ERROR", message: error.message || error };
  }
}

/* 

export function trimStringTStudyTab1(o: TStudyTabRes1[]): TStudyTabRes1[] {
  let tmp: TStudyTabRes1[] = [];
  o.forEach((e: any) => {
    (Object.keys(e) as (keyof TStudyTabRes1)[]).map(
      (k: keyof TStudyTabRes1) =>
        (e[k] =
          e[k] && typeof e[k] === "string"
            ? (e[k] as string).trim()
            : (e[k] as string)),
    );
    tmp.push(e);
  });
  return tmp;
}

*/

const queryStr = `SELECT 
  StudyKey,
  PID as HN,
  PNAME,
  EngName,
  StudyDesc,
  Modality,
  Bodypart,
  Room,
  CONVERT(char(23), StudyDate,126) as StudyDate,
  PatAge,
  CONVERT(char(23), InsertDate,126) as InsertDate,
  ExamStatus,
  Comments,
  CONVERT(char(23), VerifyTime,126) as VerifyTime,
  Dept,
  ReportDate,
  ReportTime,
  Report,
  ReportDoctor,
  VerifyDoctor,
  PStatus,
  CONVERT(char(23), ReportDT,126) as ReportDT,
  Amount,
  Clinic,
  ChargeType,
  Charge
FROM ${process.env.DB_RAD_37_DATABASE_TSTUDYTAB_SCHEMA}.TStudyTab
WHERE PID = @hn;`;
