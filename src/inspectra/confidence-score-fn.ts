import { Op } from "sequelize";
import { logGeneral } from "../log/log-general";
import { ConfidenceModel } from "../pg-model/model-inspectra";

type ReadAccessionNo =
  | {
      code: "OK";
      payload: ConfidenceModel[];
    }
  | { code: "ERROR"; message: string };

type ReadAccNoProps = { anList: string[] };
export async function readAccessionNo({
  anList,
}: ReadAccNoProps): Promise<ReadAccessionNo> {
  const timeStart = new Date();
  try {
    const find = await ConfidenceModel.findAll({
      attributes: ["accession_number", "accession_number_siriraj"],
      where: {
        [Op.or]: [
          { accession_number_siriraj: anList },
          { accession_number: anList },
        ],
      },
    });
    return { code: "OK", payload: find };
  } catch (error) {
    console.error(error);
    logGeneral({
      action: "query",
      res_type: "error",
      status_code: 500,
      detail: "Inspectra, " + (error.message || error),
      exec_time: new Date().getTime() - timeStart.getTime(),
    });
    return { code: "ERROR", message: error.message || JSON.stringify(error) };
  }
}
