export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|js)x?$": "ts-jest"  
    },
    testMatch: [
      '<rootDir>/**/*/tests/**/*.test.tsx',
    ],
    moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/tests/mocks/fileMocks.js',
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      '@contexts/(.*)': '<rootDir>/contexts/$1',
      '@hooks/(.*)': '<rootDir>/hooks/$1',
      '@graphql-types': '<rootDir>/graphql/.gql/graphql',
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  }  