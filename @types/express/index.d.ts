import { LoginPayloadType } from "../../src/middleware/auth";

declare global {
  namespace Express {
    interface Request {
      userInfo: LoginPayloadType | undefined;
    }
  }
}
