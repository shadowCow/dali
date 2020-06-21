module.exports = {
    preset: 'ts-jest',
    rootDir: '..',
    testMatch: [
        '<rootDir>/src/**/*.test.ts',
    ],
    testPathIgnorePatterns: [
        'node_modules',
        'dist',
        'public',
    ],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
    ],
    coverageDirectory: '<rootDir>/coverage',
    coverageThreshold: {
        global: {
            branches: 100,
            function: 100,
            lines: 100,
            statements: 100,
        },
    },
};