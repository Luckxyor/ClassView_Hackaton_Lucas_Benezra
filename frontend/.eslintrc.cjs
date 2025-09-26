module.exports = {
  root: true,
  parserOptions: {
    project: ['./tsconfig.json']
  },
  env: {
    browser: true,
    es2023: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended'
  ],
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    'react/react-in-jsx-scope': 'off'
  }
};
