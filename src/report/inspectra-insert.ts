import { readAccessionNo } from "../inspectra/confidence-score-fn";
import { inspectraURL } from "./inspectra-gen";
import { UserShortInfo } from "./query-report";
import { TStudyTabRes1, TStudyTabRes2 } from "./type-report";

type InspectraInsertProps = {
  record: TStudyTabRes1[];
  userInfo: UserShortInfo;
  requestFrom: string | undefined;
};
export async function inspectraInsertObject({
  record,
  userInfo,
  requestFrom,
}: InspectraInsertProps): Promise<TStudyTabRes2[]> {
  const listStudyKey: string[] = record
    .filter((e) => e.Modality === "CR" && /CHEST/i.test(e.Bodypart || ""))
    .filter((e) => e.StudyKey)
    .map((e) => String(e.StudyKey));

  const queryInspectra = await readAccessionNo({ anList: listStudyKey });
  if (queryInspectra.code !== "OK")
    return record.map((e) => ({ ...e, InspectraURL: null }));

  const studyKeyInspectra: (string | null)[] = queryInspectra.payload.map(
    (e) => e.accession_number_siriraj || e.accession_number || null,
  );

  let tmp: TStudyTabRes2[] = [];
  record.forEach((e) => {
    if (e.StudyKey !== null && studyKeyInspectra.includes(String(e.StudyKey)))
      tmp.push({
        ...e,
        InspectraURL: inspectraURL({
          studyKey: e.StudyKey,
          modality: e.Modality,
          bodypart: e.Bodypart,
          hn: e.HN,
          userInfo: userInfo,
          requestFrom: requestFrom,
        }),
      });

    tmp.push({
      ...e,
      InspectraURL: null,
    });
  });

  return tmp;
}
