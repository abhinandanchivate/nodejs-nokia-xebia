import request from "supertest";
import express from "express";
import { describe, it, beforeAll, vi, expect } from "vitest";

// Import the router to test
import rootRouter from "../../router/rootRouter.js";

// Mocked versions of the sub-routers and middleware
vi.mock("../../router/assetsRouter.js", () => {
  const router = express.Router();
  router.get("/", (req, res) =>
    res.status(200).json({ msg: "Assets route works" })
  );
  return { default: router };
});

vi.mock("../../router/userRouter.js", () => {
  const router = express.Router();
  router.get("/", (req, res) =>
    res.status(200).json({ msg: "Users route works" })
  );
  return { default: router };
});

vi.mock("../../middleware/authMiddleware.js", () => {
  return {
    authMiddleware: (req, res, next) => {
      req.user = { id: "mockUser123" }; // Simulate decoded user
      next();
    },
  };
});

// Create app for testing
let app;
beforeAll(() => {
  app = express();
  app.use(express.json());
  app.use("/api/v1", rootRouter);
});

describe("rootRouter", () => {
  it("GET /api/v1/assets should return 200 and mock message", async () => {
    const res = await request(app).get("/api/v1/assets");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ msg: "Assets route works" });
  });

  it("GET /api/v1/users should return 200 and mock message", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ msg: "Users route works" });
  });
});
