import CONFIG from "./config";
import { CorsOptions } from "cors";

type CorsCallbackProps = (error: Error | null, allow: boolean) => void;

function corsOrigin(
  origin: string | undefined,
  callback: CorsCallbackProps,
): void {
  if (!origin || CONFIG.CORS_CONF.ALLOW_ORIGIN.includes(origin)) {
    return callback(null, true);
  } else {
    console.log("CORS Deny ", origin);
    var msg =
      "The CORS policy for this site does not " +
      "allow access from the specified Origin.";
    return callback(new Error(msg), false);
  }
}

export const corsConfig: CorsOptions = {
  origin: corsOrigin,
  methods: CONFIG.CORS_CONF.ALLOW_METHODS,
  preflightContinue: true,
  credentials: true,
  maxAge: 600,
};
