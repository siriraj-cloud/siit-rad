module.exports = {
  // clearMocks: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  roots: ["<rootDir>"],
  testPathIgnorePatterns: ["<rootDir>/dist", "<rootDir>/node_modules/"],
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
