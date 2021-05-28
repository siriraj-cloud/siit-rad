import { TStudyTabRes1 } from "./type-report";

type PrepareRadReportProps = { record: TStudyTabRes1[]; UserType: string };
export function prepareReport({ record: r, UserType }: PrepareRadReportProps) {
  let tmp: TStudyTabRes1[] = [];
  r.forEach((e) => {
    // * Add timezone +0700
    (Object.keys(e) as (keyof TStudyTabRes1)[]).map(
      (k: keyof TStudyTabRes1) => {
        // Add timezone -> ISO8601 format
        if (
          ["StudyDate", "InsertDate", "VerifyTime", "ReportDT"].includes(k) &&
          typeof e[k] === "string" &&
          e[k]
        ) {
          (e[k] as string) += "+07:00";
        }
      },
    );

    // * Remove report from Status != 'Report' and 'Verify'
    if (e["PStatus"] && !["REPORT", "VERIFY"].includes(e["PStatus"]))
      e["Report"] = null;

    // * Remove Status == DELETE IN UserType != "Rad"
    if (UserType !== "Rad") {
      if (e["PStatus"] && !/DELETE/gi.test(e["PStatus"])) {
        tmp.push(e);
      }
    } else if (UserType === "Rad") {
      tmp.push(e);
    }

    // TODO Inspectra URL
  });

  tmp.sort((a, b) => {
    const aDate = a.StudyDate
      ? new Date(a.StudyDate).getTime()
      : a.InsertDate
      ? new Date(a.InsertDate).getTime()
      : 0;
    const bDate = b.StudyDate
      ? new Date(b.StudyDate).getTime()
      : b.InsertDate
      ? new Date(b.InsertDate).getTime()
      : 0;
    return bDate - aDate;
  });

  return tmp;
}
