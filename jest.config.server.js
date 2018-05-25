
const config = require('./jest.config.common');

module.exports = {
  ...config,
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: './src/__tests__/server/__setup.ts',
  testMatch: [
    '<rootDir>/src/__tests__/server/**/*.(test|spec).(ts|js)',
  ],
  collectCoverageFrom: [
    ...config.collectCoverageFrom,
    '!src/{client,next}/**/*',
  ]
}
