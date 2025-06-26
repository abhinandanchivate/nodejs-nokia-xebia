// test/setup.js

import { vi } from "vitest";

// Example: Set a global variable
globalThis.__APP_NAME__ = "ExpressApp";

// Example: Set NODE_ENV
process.env.NODE_ENV = "test";

// Example: Global mock for fetch (if you're using fetch in your app)
globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: "mocked data" }),
  })
);

// Optional: Setup global before/after hooks
beforeAll(() => {
  console.log(" Global setup before all tests");
});

afterAll(() => {
  console.log(" Global cleanup after all tests");
});
