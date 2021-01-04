module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'array-callback-return': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-console': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    '@typescript-eslint/no-shadow': 0,
    'react/no-array-index-key': 0,
    'react-hooks/exhaustive-deps': 0,
  },
};
