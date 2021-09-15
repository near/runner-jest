#!/usr/bin/env ts-node
import * as path from 'path';
// import * as process from 'process';
// import * as fs from 'fs/promises';

if (!process.argv.includes('--config')) {
  process.argv.push('--config', path.join(__dirname, 'jest.config.js'));
}

console.log(process.argv);

require('jest-cli/bin/jest');