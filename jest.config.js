module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/.next'],
  setupFiles: ['<rootDir>config.ts'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
};
