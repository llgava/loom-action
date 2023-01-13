module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',

  env: {
    es2020: true,
    node: true,
  },

  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/no-explicit-any': 'off',

    'no-useless-escape': 'off',
    'prettier/prettier': ['error', { printWidth: 120 }],
  },
};
