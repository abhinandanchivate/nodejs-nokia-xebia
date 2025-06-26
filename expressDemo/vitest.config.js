// vitest.config.js
export default {
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./test/setup.js"],
  },
};
