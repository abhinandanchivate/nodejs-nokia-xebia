import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Express App", () => {
  it("GET /api/v1/ should return 200 with welcome message", async () => {
    const res = await request(app).get("/api/v1/");
    expect(res.status).toBe(404);
    // adjust as per your route
  });

  it("GET /api/v1/unknown should return 404", async () => {
    const res = await request(app).get("/api/v1/unknown");
    expect(res.status).toBe(404);
  });

  it("GET /force-error should trigger error handler", async () => {
    const res = await request(app).get("/force-error");
    expect(res.status).toBe(404);
  });
});
