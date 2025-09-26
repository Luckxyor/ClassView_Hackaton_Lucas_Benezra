module.exports = {
  root: true,
  parserOptions: {
    project: ['./tsconfig.json']
  },
  env: {
    node: true,
    es2023: true
  },
  extends: [
    'standard-with-typescript'
  ],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
};
