/**
 * Original ref.
 * Used in siit-f "src/pages/RadReport/type-rad-report.ts"
 */
export interface TStudyTabRes1 {
  StudyKey: number;
  HN: string;
  PNAME: string | null;
  EngName: string | null;
  StudyDesc: string | null;
  Modality: string | null;
  Bodypart: string | null;
  Room: string | null;
  StudyDate: string | null; // ISO8601 Format
  PatAge: string | null;
  InsertDate: string | null; // ISO8601 Format
  ExamStatus: number | null;
  Comments: string | null;
  VerifyTime: string | null; // ISO8601 Format
  Dept: string | null;
  ReportDate: string | null;
  ReportTime: string | null;
  Report: string | null;
  ReportDoctor: string | null;
  VerifyDoctor: string | null;
  PStatus: string | null;
  ReportDT: string | null; // ISO8601 Format
  Amount: number | null;
  Clinic: string | null;
  ChargeType: string | null;
  Charge: number | null;
}

export interface TStudyTabRes2 extends TStudyTabRes1 {
  InspectraURL: string | null;
}
