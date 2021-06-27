import { readAccessionNo } from "../../src/inspectra/confidence-score-fn";

const validAcc = process.env.TEST_VALID_ACC_INSPECTRA || "00000000";

describe("Query inspectra score", () => {
  test("Query with valid accession no, should return confidential model", async () => {
    const res = await readAccessionNo({ anList: [validAcc] });
    expect(res.code).toBe("OK");
    if (res.code === "OK") {
      expect(res.payload.length).toBe(1);
      expect(res.payload[0]?.accession_number_siriraj).toBe(validAcc);
      expect(res.payload[0]?.accession_number).toBeNull();
    }
  });

  test("Query with invalid accession no, should return empty array", async () => {
    const res = await readAccessionNo({ anList: ["98765432"] });
    expect(res.code).toBe("OK");
    if (res.code === "OK") {
      expect(res.payload.length).toBe(0);
    }
  });
});
