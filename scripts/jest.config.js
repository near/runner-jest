const process = require('process');
const path = require('path');

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: process.cwd(),
  testMatch: [
    '**/__tests__/**/*.spec.ts',
    '**/__tests__/**/*.test.ts',
  ],
  setupFilesAfterEnv: [
    path.join(__dirname, 'setup.js')
  ],
  testPathIgnorePatterns: [
    "/assembly/",
    "/node_modules/"
  ],
};
