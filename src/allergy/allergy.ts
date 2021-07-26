import { Request, Response } from "express";
import { logGeneral } from "../log/log-general";
import { validateHN } from "../utils/fn";
import { queryRadAllergy } from "./query-allergy";
import { AllergyQueryRaw, AllergyRes } from "./type-allergy";

// GET  /radAllergy/:hn
export async function getRadAllery(
  req: Request<{ hn: string }>,
  res: Response<AllergyRes>,
): Promise<Response<AllergyRes>> {
  const timeStart = new Date();
  const { hn } = req.params;
  if (!validateHN(hn))
    return res.status(400).json({ status: 400, message: "Invalid HN" });

  const radAllergy = await queryRadAllergy({ hn });

  if (radAllergy.code === "NOT_FOUND") {
    logGeneral({
      req,
      action: "query",
      res_type: "not_found",
      status_code: 404,
      hn,
      detail: "Allergy, not found",
      exec_time: new Date().getTime() - timeStart.getTime(),
    });
    return res.status(404).json({ status: 404 });
  }
  if (radAllergy.code === "ERROR") {
    logGeneral({
      req,
      action: "query",
      res_type: "error",
      status_code: 500,
      hn,
      detail: "Allergy, " + radAllergy.message,
      exec_time: new Date().getTime() - timeStart.getTime(),
    });

    return res.status(500).json({
      status: 500,
      message: "Cannot connect to database/API, " + radAllergy.message,
    });
  }

  const modifyTimeToISO8601 = modifyTime(radAllergy.payload);
  const sort = modifyTimeToISO8601.sort(sortAllergy);
  const removeNullComment = sort.filter((e) => e.Comment);

  logGeneral({
    req,
    action: "query",
    res_type: "success",
    status_code: 200,
    hn,
    detail: "Allergy",
    exec_time: new Date().getTime() - timeStart.getTime(),
  });
  return res.status(200).json({ status: 200, payload: removeNullComment });
}

/*  */

function modifyTime(r: AllergyQueryRaw[]): AllergyQueryRaw[] {
  let tmp: AllergyQueryRaw[] = [];
  r.forEach((e) => {
    (Object.keys(e) as (keyof AllergyQueryRaw)[]).map((k) => {
      // Add timezone -> ISO8601 format
      if (["InsertTime"].includes(k)) e[k] = e[k] ? e[k] + "+07:00" : null;
    });
    tmp.push(e);
  });
  return tmp;
}

function sortAllergy(a: AllergyQueryRaw, b: AllergyQueryRaw): number {
  const aDate = a.InsertTime ? new Date(a.InsertTime).getTime() : 0;
  const bDate = b.InsertTime ? new Date(b.InsertTime).getTime() : 0;
  return aDate - bDate;
}
