process.env.NODE_ICU_DATA = 'node_modules/full-icu';
process.env.TZ = 'UTC'; // will not work on Windows https://github.com/nodejs/node/issues/4230

module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/utils/assetsTransformer.js',
    '\\.(css|less)$': '<rootDir/src/utils/assetsTransformer.js',
  },
  coveragePathIgnorePatterns: ['/node_modules/', 'dist/', '<rootDir>/src/index.ts', '.*\\.d\\.ts'],
  testPathIgnorePatterns: ['mocks.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,ts,tsx,jsx}',
    '!<rootDir>/src/**/*.stories.*',
    '!src/**/style.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
