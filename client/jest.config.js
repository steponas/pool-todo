/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\.tsx?$': ['ts-jest',{}],
  },
  preset: 'ts-jest',
  setupFiles: [
      '<rootDir>/src/main/services/logging/test-config.ts',
  ]
};
