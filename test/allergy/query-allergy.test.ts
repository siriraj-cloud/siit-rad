require("dotenv").config();
import { queryRadAllergy } from "../../src/allergy/query-allergy";

describe("Query allergy from database", () => {
  const validHN = process.env.TEST_VALID_HN_TSTUDY || "000000";
  test("Query valid HN, should return data", async () => {
    const res = await queryRadAllergy({ hn: validHN });
    expect(res.code).toBe("OK");
  });

  test("Query unexists HN, should return not found", async () => {
    const hn = "98765432";
    const res = await queryRadAllergy({ hn });
    expect(res.code).toBe("NOT_FOUND");
  });
});
