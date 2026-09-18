module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/test/polyfills.cjs'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
  moduleNameMapper: { '\\.css$': '<rootDir>/test/styleMock.cjs' },
  globals: { __API_URL__: '/api' },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.jsx',
    '!src/setupTests.js',
  ],
  clearMocks: true,
};
