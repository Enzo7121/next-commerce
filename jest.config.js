/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "<rootDir>/cypress/",
    "<rootDir>/.next/",
    "<rootDir>/node_modules",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  globals: {
    "ts-jest": {
      tsconfig: "./jest/tsconfig.json",
    },
  },
};
