// jest.config.js
module.exports = {
    testEnvironment: 'node',
    clearMocks: true,
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/controllers/**/*.js'],
    testPathIgnorePatterns: ['/node_modules/'],
};
