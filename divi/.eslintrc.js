module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'comma-dangle': [
      'error',
      'never'
    ],
    'no-underscore-dangle': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    typeof: true
  }
};
