module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['@dwp/eslint-config-base', 'plugin:sonarjs/recommended', 'plugin:security/recommended',
  ],
  plugins: [
    'no-unsafe-regex',
    'sonarjs',
    'security',
  ],
  rules: {
    indent: [
      2,
      2,
    ],
    semi: [
      0,
    ],
    'sonarjs/cognitive-complexity': [
      1,
    ],
    'jsdoc/require-description-complete-sentence': 0,
    'no-unsafe-regex/no-unsafe-regex': 2,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
  },
  ignorePatterns: ['**/govuk-prototype-kit/**', '**/govuk-component-generator/**'],
}
