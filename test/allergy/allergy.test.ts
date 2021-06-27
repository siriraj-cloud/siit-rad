require("dotenv").config();
import request from "supertest";
import app from "../../src/app";

describe("Integration, allergy", () => {
  const validHN = process.env.TEST_VALID_HN_TSTUDY || "000000";
  test("Ping", async () => {
    const hn = validHN;
    const res = await request(app).get("/radAllergy/" + hn);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(200);
    if (res.body.status === 200) {
      expect(res.body.payload.length).toBeGreaterThan(5);
      expect(
        res.body.payload.map((e: any) => e.Comment).every((e: any) => e),
      ).toBe(true);
    }
  });
});
