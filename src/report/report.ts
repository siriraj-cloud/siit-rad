import { queryRadReport } from "./query-report";
import { Request, Response } from "express";
import { TStudyTabRes1 } from "./type-report";

// GET  /radreport/:hn
type RadReportRes =
  | {
      status: 200;
      payload: TStudyTabRes1[];
    }
  | { status: 404 }
  | { status: 400 | 401 | 500; message: string };

export async function getRadReport(
  req: Request<RadReportProps>,
  res: Response<RadReportRes>,
): Promise<Response<RadReportRes>> {
  const { hn } = req.params;

  const queryReport = await queryRadReport({ hn });

  if (queryReport.code === "NOT_FOUND")
    return res.status(404).json({ status: 404 });

  if (queryReport.code === "ERROR")
    return res.status(500).json({ status: 500, message: queryReport.message });

  return res.status(200).json({ status: 200, payload: queryReport.payload });
}

type RadReportProps = { hn: string };
