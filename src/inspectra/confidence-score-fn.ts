import { Op } from "sequelize";
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
    // return find;
  } catch (error) {
    console.error(error);
    return { code: "ERROR", message: error.message || JSON.stringify(error) };
  }
}
