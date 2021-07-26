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
  | "auth"
  | "siit"
  | "eclair"
  | "radiology"
  | "buddy"
  | "med_note"
  | "appointment"
  | "vaccination"
  | "log";

export type ActionList = "query" | "fetch" | "cache";

export type ResTypeList = "success" | "not_found" | "error";
