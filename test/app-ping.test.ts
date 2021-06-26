require("dotenv").config();
jest.useFakeTimers();
import request from "supertest";
import app from "../src/app";

describe("Test ping", () => {
  test("Ping", async () => {
    const res = await request(app).get("/ping");
    expect(res.status).toBe(200);
    expect(res.text).toBe("OK");
  });
});
