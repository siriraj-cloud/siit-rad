require("dotenv").config();
import { queryRadReport, UserShortInfo } from "../../src/report/query-report";

describe("Query radiology report", () => {
  const validHN = process.env.TEST_VALID_HN_TSTUDY || "000000";
  const userInfo: UserShortInfo = {
    AccountName: "12345678",
    fullName: "test test",
    displayName: "test test test",
    location: ["Radiology", "Test"],
  };
  test("Query from valid HN", async () => {
    const hn = validHN;
    const res = await queryRadReport({
      hn,
      userInfo,
      requestFrom: "10.7.12.138",
    });
    expect(res.code).toBe("OK");
    if (res.code === "OK") {
      expect(res.payload.length).toBeGreaterThanOrEqual(1);
    }
  });
});
