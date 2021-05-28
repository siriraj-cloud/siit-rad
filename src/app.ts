import express, { Application, Request, Response } from "express";
import { getRadReport } from "./report/report";
import { authMiddleware } from "./middleware/auth";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/radreport/:hn", authMiddleware, getRadReport); // TODO: Auth middleware

/**
 * Health check
 */
app.get("/ping", (_req: Request, res: Response<string>) => {
  return res.status(200).end("OK");
});

export default app;
