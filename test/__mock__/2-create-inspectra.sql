CREATE TABLE "public"."api_inspectrapredictionconfidencescore" (
  "id" int4 NOT NULL DEFAULT nextval('api_inspectrapredictionconfidentscore_id_seq'::regclass),
  "accession_number" text COLLATE "pg_catalog"."default",
  "create_date" timestamptz(6),
  "abnormality" int4,
  "tuberculosis" int4,
  "atelectasis" int4,
  "cardiomegaly" int4,
  "pulmonary_edema" int4,
  "lung_opacity" int4,
  "mass" int4,
  "nodule" int4,
  "pleural_effusion" int4,
  "request_id" text COLLATE "pg_catalog"."default",
  "study_dcm_date" date,
  "model_version" text COLLATE "pg_catalog"."default",
  "ctr" float8,
  "ctr_measurements" text COLLATE "pg_catalog"."default",
  "resource" text COLLATE "pg_catalog"."default",
  "accession_number_siriraj" text COLLATE "pg_catalog"."default"
);

CREATE INDEX "api_inspect_accessi_674014_idx" ON "public"."api_inspectrapredictionconfidencescore" USING btree (
  "accession_number_siriraj" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "api_inspect_accessi_8fe8af_idx" ON "public"."api_inspectrapredictionconfidencescore" USING btree (
  "accession_number" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "api_inspect_create__a63962_idx" ON "public"."api_inspectrapredictionconfidencescore" USING btree (
  "create_date" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "api_inspect_request_4c8fcc_idx" ON "public"."api_inspectrapredictionconfidencescore" USING btree (
  "request_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "api_inspect_study_d_038886_idx" ON "public"."api_inspectrapredictionconfidencescore" USING btree (
  "study_dcm_date" "pg_catalog"."date_ops" ASC NULLS LAST
);

ALTER TABLE "public"."api_inspectrapredictionconfidencescore" ADD CONSTRAINT "api_inspectrapredictionconfidentscore_pkey" PRIMARY KEY ("id");
