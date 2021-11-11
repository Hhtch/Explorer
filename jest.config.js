process.env.NODE_ENV = 'UNITTEST';
module.exports = {
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "\\.(pug)$": "jest-transform-pug"
      },
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        './routes/**/*.ts',
        './*.ts'
    ],
    coverageDirectory: '<rootDir>/test/coverage',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    preset: 'ts-jest'
};