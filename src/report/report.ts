import { Request, Response } from "express";
import { logGeneral } from "../log/log-general";
import { queryRadReport, UserShortInfo } from "./query-report";
import { TStudyTabRes2 } from "./type-report";

/**
 * Original ref.
 * Used in siit-f "src/pages/RadReport/type-rad-report.ts"
 */
type RadReportRes =
  | {
      status: 200;
      payload: TStudyTabRes2[];
    }
  | { status: 404 }
  | { status: 400 | 401 | 500; message: string };

// GET  /radreport/:hn
export async function getRadReport(
  req: Request<{ hn: string }>,
  res: Response<RadReportRes>,
): Promise<Response<RadReportRes>> {
  const timeStart = new Date();
  const { hn } = req.params;
  if (!req.userInfo)
    return res.status(401).json({ status: 401, message: "Login required" });
  const { AccountName, fullName, displayName, location } = req.userInfo;
  const userInfo: UserShortInfo = {
    AccountName,
    fullName,
    displayName,
    location,
  };
  const { origin, host, referer } = req.headers;

  const queryReport = await queryRadReport({
    hn,
    userInfo,
    requestFrom: origin || referer || host,
  });

  if (queryReport.code === "NOT_FOUND") {
    logGeneral({
      req,
      action: "query",
      res_type: "not_found",
      status_code: 404,
      hn,
      detail: "Report, not found",
      exec_time: new Date().getTime() - timeStart.getTime(),
    });
    return res.status(404).json({ status: 404 });
  }

  if (queryReport.code === "ERROR") {
    logGeneral({
      req,
      action: "query",
      res_type: "error",
      status_code: 500,
      hn,
      detail: "Report, " + queryReport.message,
      exec_time: new Date().getTime() - timeStart.getTime(),
    });
    return res.status(500).json({ status: 500, message: queryReport.message });
  }

  logGeneral({
    req,
    action: "query",
    res_type: "success",
    status_code: 200,
    hn,
    detail: "Report",
    exec_time: new Date().getTime() - timeStart.getTime(),
  });
  return res.status(200).json({ status: 200, payload: queryReport.payload });
}
