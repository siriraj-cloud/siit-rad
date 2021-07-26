/**
 * From siit-log  src/types/log-general.ts
 */
export type LogGeneralBody = {
  service?: ServiceList;
  action?: ActionList;
  res_type?: ResTypeList;
  status_code?: number;
  hn?: string;
  detail?: string;
  exec_time?: number;
  login_user?: string;
  login_fullname?: string;
  login_domain?: string;
  ip?: string;
  user_agent?: string;
};

export type ServiceList =
  | "login"
  | "siit"
  | "eclair_cumulative"
  | "eclair_observation"
  | "eclair_pathology"
  | "rad_report"
  | "medication"
  | "allergy"
  | "information"
  | "buddy_opd"
  | "buddy_ipd"
  | "med_note"
  | "appointment"
  | "vaccination"
  | "log";

export type ActionList = "query" | "fetch" | "cache";

export type ResTypeList = "success" | "error";
