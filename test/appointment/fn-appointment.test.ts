require("dotenv").config();
import { addTimezone } from "../../src/appointment/fn-appointment";

describe("Add time zone from datetime string", () => {
  test("Add +07:00 time zone", () => {
    const data: {
      StudyDate: string;
      InsertDT: string;
      ModifiedDT: string;
      undef: string;
    }[] = [
      {
        StudyDate: "2021-02-01T23:59:00",
        InsertDT: "2021-02-01T23:22:00",
        ModifiedDT: "2021-02-01T23:01:00",
        undef: "2021-02-01T23:00:00",
      },
    ];
    const res = addTimezone<{
      StudyDate: string;
      InsertDT: string;
      ModifiedDT: string;
      undef: string;
    }>(data);
    expect(res[0].StudyDate).toBe("2021-02-01T23:59:00+07:00");
    expect(res[0].InsertDT).toBe("2021-02-01T23:22:00+07:00");
    expect(res[0].ModifiedDT).toBe("2021-02-01T23:01:00+07:00");
    expect(res[0].undef).toBe("2021-02-01T23:00:00");
  });
});
