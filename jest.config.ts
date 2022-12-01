export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|js)x?$": "ts-jest"  
    },
    testMatch: [
      '<rootDir>/tests/__test__/*.test.js',
      '<rootDir>/tests/__test__/*.test.tsx',
    ],
    moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/tests/mocks/fileMocks.js',
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  }  