CREATE TABLE public.api_inspectrapredictionconfidencescore (
	id int4 NOT NULL,
	accession_number text NULL,
	create_date timestamptz NULL,
	abnormality int4 NULL,
	tuberculosis int4 NULL,
	atelectasis int4 NULL,
	cardiomegaly int4 NULL,
	pulmonary_edema int4 NULL,
	lung_opacity int4 NULL,
	mass int4 NULL,
	nodule int4 NULL,
	pleural_effusion int4 NULL,
	request_id text NULL,
	study_dcm_date date NULL,
	model_version text NULL,
	ctr float8 NULL,
	ctr_measurements text NULL,
	resource text NULL,
	accession_number_siriraj text NULL,
	CONSTRAINT api_inspectrapredictionconfidentscore_pkey PRIMARY KEY (id)
);
CREATE INDEX api_inspect_accessi_674014_idx ON public.api_inspectrapredictionconfidencescore USING btree (accession_number_siriraj);
CREATE INDEX api_inspect_accessi_8fe8af_idx ON public.api_inspectrapredictionconfidencescore USING btree (accession_number);
CREATE INDEX api_inspect_create__a63962_idx ON public.api_inspectrapredictionconfidencescore USING btree (create_date);
CREATE INDEX api_inspect_request_4c8fcc_idx ON public.api_inspectrapredictionconfidencescore USING btree (request_id);
CREATE INDEX api_inspect_study_d_038886_idx ON public.api_inspectrapredictionconfidencescore USING btree (study_dcm_date);
