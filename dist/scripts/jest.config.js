"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = require('process');
const path = require('path');
exports.default = {
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
//# sourceMappingURL=jest.config.js.map