import nextJest from 'next/jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig = {
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', __dirname],
  transform: {
    '^.+\\.tsx?$': ['@swc/jest'],
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coveragePathIgnorePatterns: [
    'src/pages/_app.tsx',
    'src/pages/_error.tsx',
    'src/pages/_document.tsx',
    'src/components/icons/*',
    'src/lib/*/index.ts',
    'src/utils/*/index.ts',
    'src/features/*/index.ts',
    'src/components/*/index.ts',
    'src/graphql/*/index.ts',
    'src/graphql/queries/*',
    'src/graphql/mutations/*',
    'src/graphql/types/*',
  ],
  moduleNameMapper: {
    '\\.(scss|css)$': 'identity-obj-proxy',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig)
