/**
 * Original Ref.
 * Used in siit-f "src/pages/Appointment/type-rad-appointment.ts"
 */
export type ScheduleTable = {
  RefNo: string | null;
  HN: string | null;
  Type: string | null;
  IPD_OPD: string | null;
  Location: string | null;
  LocationList: string | null;
  Modality: string | null;
  Bodypart: string | null;
  Room: string | null;
  StudyDate: string | null;
  StudyStart: string | null;
  StudyDuration: string | null;
  Cost: string | null;
  Note: string | null;
  EVENT: string | null;
  Status: "APPOINTED" | "DELETE" | null;
  InsertDT: string | null;
  ModifiedDT: string | null;
  Phone1: string | null;
  phone2: string | null;
  phone3: string | null;
  icon1: string | null;
  icon2: string | null;
  icon3: string | null;
};

export const scheduleQueryStr = `SELECT
  RefNo,
  HN,
  Type,
  IPD_OPD,
  Location,
  LocationList,
  Modality,
  Bodypart,
  Room,
  CONVERT(char(23), StudyDate,126) as StudyDate,
  StudyStart,
  StudyDuration,
  Cost,
  Note,
  EVENT,
  Status,
  CONVERT(char(23), InsertDT,126) as InsertDT,
  CONVERT(char(23), ModifiedDT,126) as ModifiedDT,
  Phone1,
  phone2,
  phone3,
  icon1,
  icon2,
  icon3
FROM ${process.env.DB_RAD_37_DATABASE_APPOINTMENT_SCHEMA}.SCHEDULE 
WHERE HN = @hn`;
