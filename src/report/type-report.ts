export interface TStudyTabRes1 {
  StudyKey: number;
  HN: string;
  PNAME: string | null;
  EngName: string | null;
  StudyDesc: string | null;
  Modality: string | null;
  Bodypart: string | null;
  Room: string | null;
  StudyDate: Date | null;
  PatAge: string | null;
  InsertDate: string | null;
  ExamStatus: number | null;
  Comments: string | null;
  VerifyTime: Date | null;
  Dept: string | null;
  ReportDate: string | null;
  ReportTime: string | null;
  Report: string | null;
  ReportDoctor: string | null;
  VerifyDoctor: string | null;
  PStatus: string | null;
  ReportDT: Date | null;
  Amount: number | null;
  Clinic: string | null;
  ChargeType: string | null;
  Charge: number | null;
}

export interface TStudyTabRes2 extends TStudyTabRes1 {
  InspectraURL: string | null;
}
