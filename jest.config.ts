import type {Config} from 'jest';

const config: Config = {  
  clearMocks: true,
  coverageProvider: "babel",
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};

export default config;
