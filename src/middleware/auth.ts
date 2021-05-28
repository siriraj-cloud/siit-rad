import { AxiosResponse } from "axios";
import { Request, Response, NextFunction } from "express";
import { axiosInstanceAuth } from "../utils/axios-instants";
import CONFIG from "../utils/config";

/**
 * Reference type from 'siit-auth' -> 'src/login/type-login.ts'
 */
export type LoginPayloadType = {
  UserType: "Rad" | "sihmis";
  AccountName: string;
  employeeID: string | null;
  displayName: string;
  givenName: string;
  surName: string;
  fullName: string;
  location: string[];
  userAccountControl: string | null;
  group: { cn: string; description: string | null }[];
  iat?: number; // issued at
};

/**
 * Express middleware function
 * Create req.userInfo variable if valid cookie
 * req.userInfo = undefined if invalid cookie
 * @param req - Express request
 * @param res - Express response
 * @param next - Next function in Express middleware
 * @returns Void
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  if (
    (process.env.AUTH_BYPASS === "true" ||
      process.env.CI === "true" ||
      process.env.NODE_ENV === "test") &&
    process.env.NODE_ENV !== "production"
  ) {
    next();
    return;
  }

  // console.log(req.cookie);

  const cookieID: string = req.cookies[CONFIG.cookie.client_cookie_name] || "";
  if (!cookieID)
    return res.status(401).json({ status: 401, message: "Please login" });
  try {
    const res: AxiosResponse<GetLoggedInUserRes> = await axiosInstanceAuth({
      method: "get",
      url: "getLoggedInUser/" + cookieID,
    });
    const payload = res.data.payload;
    // console.log(payload);
    if (payload) req.userInfo = payload;
    next();
  } catch (error) {
    if (error.response) {
      if (error.response?.status === 401)
        return res.status(401).json({ status: 401, message: "Please login" });

      if (error.response?.status === 500)
        return res.status(500).json({
          status: 500,
          message: "Internal server error: Authentication service",
        });
    }
    if (error.code === "ECONNREFUSED")
      return res.status(500).json({
        status: 500,
        message:
          "Internal server error: API timeout, cannot connect to authentication service",
      });

    return res.status(500).json({
      status: 500,
      message: "Internal server error: non-specific error in auth service",
    });
  }
}

if (process.env.NODE_ENV === "production" && process.env.AUTH_BYPASS === "true")
  console.error("ENV AUTH_BYPASS is true in 'production' mode");

/**
 * Original type from siit-auth 'src/check/get-logged-user.ts'
 */
type GetLoggedInUserRes = {
  status: number;
  message?: string;
  payload?: LoginPayloadType;
};
