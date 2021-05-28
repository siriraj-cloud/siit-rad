import { TStudyTabRes1 } from "./report/type-report";

export function trimStringTStudyTab1(o: TStudyTabRes1[]): TStudyTabRes1[] {
  let tmp: TStudyTabRes1[] = [];
  o.forEach((e: any) => {
    (Object.keys(e) as (keyof TStudyTabRes1)[]).map(
      (k: keyof TStudyTabRes1) =>
        (e[k] =
          e[k] && typeof e[k] === "string"
            ? (e[k] as string).trim()
            : (e[k] as string)),
    );
    tmp.push(e);
  });
  return tmp;
}
