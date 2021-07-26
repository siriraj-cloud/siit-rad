import axios, { AxiosError } from "axios";
import { Request } from "express";
import { LoginPayloadType } from "../middleware/auth";
import { ActionList, LogGeneralBody, ResTypeList } from "./type-log-general";

type LogGeneralProps = {
  // * Require "userInfo" OR "req"
  userInfo?: LoginPayloadType;
  req?: Request;

  // General info
  action?: ActionList;
  res_type?: ResTypeList;
  status_code?: number;
  hn?: string;
  detail?: string;
  exec_time?: number;
  ip?: string;
};

export async function logGeneral({
  userInfo,
  action,
  res_type,
  status_code,
  hn,
  detail,
  exec_time,
  ip,
  req,
}: LogGeneralProps): Promise<void> {
  if (process.env.NODE_ENV !== "production") return;

  const payload: LogGeneralBody = {
    service: "rad_report",
    action,
    res_type,
    status_code,
    hn,
    detail,
    exec_time,
    login_user: userInfo?.AccountName || req?.userInfo?.AccountName,
    login_fullname: userInfo?.displayName || req?.userInfo?.displayName,
    login_domain: userInfo?.location
      ? userInfo.location.join("/")
      : req?.userInfo?.location
      ? req?.userInfo?.location.join("/")
      : undefined,
    ip:
      ip ||
      (req?.headers?.["x-forwarded-for"] as string | undefined) ||
      (req?.headers?.["x-real-ip"] as string | undefined),
    user_agent: req?.headers?.["user-agent"],
  };

  try {
    await axios({
      method: "POST",
      baseURL: process.env.API_LOG_BASEURL,
      url: "/writeGeneral",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
      proxy: false,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const error: AxiosError<{ status: number; message: string }> = e;
      console.error("logGeneral", error.response?.status);
      return;
    }
    console.error("logGeneral", e.code, e.message || e);
  }
}

if (process.env.API_LOG_BASEURL === undefined)
  console.error("ENV API_LOG_BASEURL is undefined");
