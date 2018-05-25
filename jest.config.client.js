
const config = require('./jest.config.common');

module.exports = {
  ...config,
  testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: './src/__tests__/client/__setup.ts',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [
    '<rootDir>/src/__tests__/client/**/*.(test|spec).(ts|js|tsx|jsx)',
  ],
  collectCoverageFrom: [
    ...config.collectCoverageFrom,
    '!src/{server}/**/*',
  ]
}
