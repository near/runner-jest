const process = require('process');
const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: process.cwd(),
  testMatch: [
    '**/__tests__/**/*.spec.ts',
    '**/__tests__/**/*.test.ts',
  ],
  setupFilesAfterEnv: [
    path.join(__dirname, 'scripts', 'setup.js'),
  ],
  testPathIgnorePatterns: [
    '/assembly/',
    '/node_modules/',
  ],
};
