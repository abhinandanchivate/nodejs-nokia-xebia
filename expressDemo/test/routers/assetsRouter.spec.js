// // test/routers/assetsRouter.spec.js
// import request from "supertest";
// import express from "express";
// import * as controller from "../../controller/assetsController.js";
// import { describe, it, beforeEach, vi, expect } from "vitest";

// // Dynamically import router *after* mocking
// let app;

// beforeEach(async () => {
//   vi.restoreAllMocks(); // clear previous spies

//   // Mock controller before importing router
//   vi.spyOn(controller, "getAllAsset").mockImplementation((req, res) => {
//     return res.status(200).json([
//       { id: 1, name: "Laptop", assignedTo: "john@example.com" },
//       { id: 2, name: "Monitor", assignedTo: "jane@example.com" },
//     ]);
//   });

//   // Recreate app with freshly imported router (now using the mock)
//   const { default: assetsRouter } = await import(
//     "../../router/assetsRouter.js"
//   );

//   app = express();
//   app.use(express.json());
//   app.use("/api/v1/assets", assetsRouter);
// });

// it("GET /api/v1/assets/all - should return snapshot", async () => {
//   const response = await request(app).get("/api/v1/assets/all");
//   expect(response.status).toBe(200);
//   console.log(response.body);
//   expect(response.body).toMatchSnapshot();
// }, 10000);

import request from "supertest";
import express from "express";
import * as controller from "../../controller/assetsController.js";
import { describe, it, beforeEach, vi, expect } from "vitest";

// ✅ Stub auth middleware to always allow
vi.mock("../../middleware/authMiddleware.js", () => ({
  authMiddleware: (req, res, next) => next(),
}));

let app;

beforeEach(async () => {
  vi.restoreAllMocks(); // clear previous spies

  // ✅ Mock getAssetById before loading router
  vi.spyOn(controller, "getAssetById").mockImplementation((req, res) => {
    return res.status(200).json({
      id: req.params.id,
      name: "Keyboard",
      assignedTo: "mark@example.com",
    });
  });

  const { default: assetsRouter } = await import(
    "../../router/assetsRouter.js"
  );

  app = express();
  app.use(express.json());
  app.use("/api/v1/assets", assetsRouter);
});

it("GET /api/v1/assets/:id - should return single asset snapshot", async () => {
  const res = await request(app).get("/api/v1/assets/123");

  expect(res.status).toBe(200);
  expect(res.body).toMatchSnapshot();
});
