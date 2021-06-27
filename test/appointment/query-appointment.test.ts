require("dotenv").config();
import { queryAppointment } from "../../src/appointment/query-appointment";

describe("Query appointment from database", () => {
  const validHN = process.env.TEST_VALID_HN_TSTUDY || "000000";
  test("Query with valid HN, should return data", async () => {
    const hn = validHN;
    const res = await queryAppointment({ hn });
    expect(res.code).toBe("OK");
    if (res.code === "OK") {
      expect(res.payload.length).toBeGreaterThan(5);
      expect(res.payload.map((e) => e.HN).every((e) => e === hn)).toBe(true);
    }
  });
});
