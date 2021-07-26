import { Request, Response } from "express";
import { logGeneral } from "../log/log-general";
import { queryAppointment } from "./query-appointment";
import { ScheduleTable } from "./type-table-schedule";

/**
 * Original Ref.
 * Used in siit-f "src/pages/Appointment/type-rad-appointment.ts"
 */
type RadAppointmentRes =
  | {
      status: 200;
      payload: ScheduleTable[];
    }
  | { status: 404 }
  | { status: 400 | 401 | 500; message: string };

// GET  /radSchedule/:hn
export async function getRadAppointment(
  req: Request,
  res: Response<RadAppointmentRes>,
): Promise<Response<RadAppointmentRes>> {
  const timeStart = new Date();
  const { hn } = req.params;
  if (!req.userInfo)
    return res.status(401).json({ status: 401, message: "Login required" });

  const queryApp = await queryAppointment({ hn });
  if (queryApp.code === "NOT_FOUND") {
    logGeneral({
      req,
      action: "query",
      res_type: "not_found",
      status_code: 404,
      hn,
      detail: "Appointment, not found",
      exec_time: new Date().getTime() - timeStart.getTime(),
    });
    return res.status(404).json({ status: 404 });
  }

  if (queryApp.code === "ERROR") {
    logGeneral({
      req,
      action: "query",
      res_type: "error",
      status_code: 500,
      hn,
      detail: "Appointment, " + queryApp.message,
      exec_time: new Date().getTime() - timeStart.getTime(),
    });
    return res.status(500).json({ status: 500, message: queryApp.message });
  }

  return res.status(200).json({ status: 200, payload: queryApp.payload });
}
