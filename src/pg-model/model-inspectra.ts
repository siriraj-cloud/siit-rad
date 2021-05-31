import { DataTypes, Model, Optional } from "sequelize";
import { pgInspectra } from "../db-conn/db-inspectra";

export interface InspectraConfidenceScoreAttr {
  id?: number;
  accession_number?: string;
  create_date?: Date;
  abnormality?: number;
  tuberculosis?: number;
  atelectasis?: number;
  cardiomegaly?: number;
  pulmonary_edema?: number;
  lung_opacity?: number;
  mass?: number;
  nodule?: number;
  pleural_effusion?: number;
  request_id?: string;
  study_dcm_date?: string;
  model_version?: string;
  ctr?: number;
  ctr_measurements?: string;
  resource?: string;
  accession_number_siriraj?: string;
}

export type api_inspectrapredictionconfidencescorePk = "id";
export type api_inspectrapredictionconfidencescoreId =
  ConfidenceModel[api_inspectrapredictionconfidencescorePk];
export type api_inspectrapredictionconfidencescoreCreationAttributes = Optional<
  InspectraConfidenceScoreAttr,
  api_inspectrapredictionconfidencescorePk
>;

export class ConfidenceModel
  extends Model<
    InspectraConfidenceScoreAttr,
    api_inspectrapredictionconfidencescoreCreationAttributes
  >
  implements InspectraConfidenceScoreAttr
{
  id?: number;
  accession_number?: string;
  create_date?: Date;
  abnormality?: number;
  tuberculosis?: number;
  atelectasis?: number;
  cardiomegaly?: number;
  pulmonary_edema?: number;
  lung_opacity?: number;
  mass?: number;
  nodule?: number;
  pleural_effusion?: number;
  request_id?: string;
  study_dcm_date?: string;
  model_version?: string;
  ctr?: number;
  ctr_measurements?: string;
  resource?: string;
  accession_number_siriraj?: string;
}

ConfidenceModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    accession_number: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    abnormality: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tuberculosis: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    atelectasis: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cardiomegaly: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pulmonary_edema: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lung_opacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mass: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nodule: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pleural_effusion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    request_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    study_dcm_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    model_version: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ctr: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    ctr_measurements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    resource: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    accession_number_siriraj: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: pgInspectra,
    tableName: "api_inspectrapredictionconfidencescore",
    schema: "public",
    timestamps: false,
    createdAt: "create_date",
    updatedAt: false,
    indexes: [
      {
        name: "api_inspect_accessi_674014_idx",
        fields: [{ name: "accession_number_siriraj" }],
      },
      {
        name: "api_inspect_accessi_8fe8af_idx",
        fields: [{ name: "accession_number" }],
      },
      {
        name: "api_inspect_create__a63962_idx",
        fields: [{ name: "create_date" }],
      },
      {
        name: "api_inspect_request_4c8fcc_idx",
        fields: [{ name: "request_id" }],
      },
      {
        name: "api_inspect_study_d_038886_idx",
        fields: [{ name: "study_dcm_date" }],
      },
      {
        name: "api_inspectrapredictionconfidentscore_pkey",
        unique: true,
        fields: [{ name: "id" }],
      },
    ],
  },
);
