export default {
  extension: ["js"], // file extensions to test
  spec: "test/**/*.spec.js", // test file pattern
  timeout: 5000, // timeout per test case
  require: ["chai/register-expect"], // automatically use Chai's "expect" globally
  recursive: true, // include subdirectories
  reporter: "spec", // test result reporter
};
