module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.build.json',
    },
  },
  moduleFileExtensions: ['js', 'ts', 'jsx', 'tsx', 'json'],
  transform: {
    '^.+\\.tsx?$': './node_modules/ts-jest/preprocessor.js',
  },
  moduleNameMapper: {
    '@app/(.*)$': '<rootDir>/src/$1',
    '@server/(.*)$': '<rootDir>/src/server/$1',
    '@client/(.*)$': '<rootDir>/src/client/$1',
    '@next/(.*)$': '<rootDir>/src/next/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    // Ignore patterns
    '!src/index.ts',
    '!src/**/__tests__/**/*',
    '!src/server/{database,index}.ts',
    '!src/{bootstrap,next}/**/*',
    '!{ormconfig,next.config}.js',
    '!**/*.d.ts',
  ],
  coverageReporters: ['lcov', 'json'],
}
