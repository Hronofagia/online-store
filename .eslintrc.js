module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard-with-typescript', 'prettier'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js', 'webpack.config.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
