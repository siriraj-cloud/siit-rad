import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { authMiddleware } from "./middleware/auth";
import { getRadReport } from "./report/report";
import { corsConfig } from "./utils/config-cors";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ####################### */
// * CORS
/* istanbul ignore next */
if (process.env.CORS_PROTECT_BY_ORIGIN === "on") app.use(cors(corsConfig));

app.get("/radreport/:hn", authMiddleware, getRadReport); // TODO: Auth middleware

/**
 * Health check
 */
app.get("/ping", (_req: Request, res: Response<string>) => {
  return res.status(200).end("OK");
});

export default app;
