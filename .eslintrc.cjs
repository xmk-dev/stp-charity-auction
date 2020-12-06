module.exports = {
  env: {
    node: true,
    es2020: true,
  },
  plugins: [
    'xss',
    'html',
    'sonarjs',
    'unicorn',
    'security',
    'markdown',
    'prettier',
    'filenames',
    'no-secrets',
    'switch-case',
    'no-unsanitized',
    'optimize-regex',
    'eslint-comments',
    'simple-import-sort',
  ],
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:no-unsanitized/DOM',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:security/recommended',
    'plugin:markdown/recommended',
    'plugin:switch-case/recommended',
    'plugin:optimize-regex/recommended',
    'plugin:eslint-comments/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  overrides: [
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown',
    },
  ],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'prettier/prettier': ['error'],
    'simple-import-sort/sort': 'error',
    'import/prefer-default-export': 'off',
    'no-secrets/no-secrets': [
      'error',
      // eslint-disable-next-line no-secrets/no-secrets
      { additionalRegexes: { 'Basic Auth': 'Authorization: Basic [A-Za-z0-9+/=]*' } },
    ],
    'xss/no-mixed-html': 2,
    'xss/no-location-href-assign': 2,
    'filenames/match-exported': [2, 'kebab'],
    'filenames/no-index': 0,
    'import/extensions': 0,
  },
};
