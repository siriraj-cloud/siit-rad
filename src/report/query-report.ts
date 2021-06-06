import sql from "mssql";
import { db37PacsCon, db37PacsPool } from "../db-conn/db-radiology";
import { trimStringGeneric } from "../utils/fn-trim";
import { inspectraInsertObject } from "./inspectra-insert";
import { prepareReport } from "./report-prepare";
import { TStudyTabRes1, TStudyTabRes2 } from "./type-report";

type QueryRadReportRes =
  | {
      code: "OK";
      payload: TStudyTabRes2[];
    }
  | { code: "NOT_FOUND" }
  | { code: "ERROR"; message: string };
type QueryRadReportProps = {
  hn: string;
  userInfo: UserShortInfo;
  requestFrom: string | undefined;
};
export async function queryRadReport({
  hn,
  userInfo,
  requestFrom,
}: QueryRadReportProps): Promise<QueryRadReportRes> {
  try {
    await db37PacsCon;
    const request = db37PacsPool.request();
    const query: sql.IResult<TStudyTabRes1> = await request
      .input("hn", sql.VarChar, hn)
      .query(queryStr);
    if (query && query.rowsAffected[0] > 0) {
      const trim = trimStringGeneric<TStudyTabRes1>(query.recordset);
      const prepare1 = prepareReport({ record: trim, UserType: "" });
      const prepareInspectra = await inspectraInsertObject({
        record: prepare1,
        userInfo,
        requestFrom,
      });
      return { code: "OK", payload: prepareInspectra };
    } else {
      return { code: "NOT_FOUND" };
    }
  } catch (error) {
    // console.error("queryRadReport()", error);
    return { code: "ERROR", message: error.message || error };
  }
}

export type UserShortInfo = {
  AccountName: string;
  fullName: string;
  displayName: string;
  location: string[];
};

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
