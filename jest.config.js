export default {
  transform: {},
  testEnvironment: "node",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js", // include all JavaScript files in src
    "!src/index.js", // exclude specific files
    "!src/**/*.test.js", // exclude test files
  ],
};
