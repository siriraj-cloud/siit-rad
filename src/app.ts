import express, { Application, Request, Response } from "express";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Health check
 */
app.get("/ping", (_req: Request, res: Response<string>) => {
  return res.status(200).end("OK");
});

export default app;
