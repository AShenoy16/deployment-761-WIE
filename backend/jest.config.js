module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest", // Tells Jest to use ts-jest for .ts files
  },
  moduleFileExtensions: ["ts", "js"], // Include TypeScript and JavaScript
  testMatch: ["**/__tests__/**/*.test.ts"], // Looks for test files ending with .test.ts
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json", // Points to your TypeScript config
    },
  },
};
