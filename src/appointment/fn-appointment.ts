import { ScheduleTable } from "./type-table-schedule";

export function addTimezone<T extends { [key: string]: any }>(r: T[]): T[] {
  let tmp: T[] = [];
  r.forEach((e) => {
    (Object.keys(e) as (keyof T)[]).map((k: keyof T) => {
      // Add timezone -> ISO8601 format
      if (
        ["StudyDate", "InsertDT", "ModifiedDT"].includes(k as string) &&
        e[k]
      ) {
        e[k] = (e[k] + "+07:00") as any;
      }
    });
    tmp.push(e);
  });

  return tmp;
}

export function sortByDate(a: ScheduleTable, b: ScheduleTable): number {
  const aDate = a.StudyDate
    ? new Date(a.StudyDate).getTime()
    : a.InsertDT
    ? new Date(a.InsertDT).getTime()
    : 0;
  const bDate = b.StudyDate
    ? new Date(b.StudyDate).getTime()
    : b.InsertDT
    ? new Date(b.InsertDT).getTime()
    : 0;
  return bDate - aDate;
}
