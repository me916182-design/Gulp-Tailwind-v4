module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script',
  },
  plugins: ['import', 'prettier'],
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'warn',
    'no-var': 'warn',
    'prefer-const': 'warn',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'import/no-unresolved': 'off',
  },
  globals: {
    Swiper: 'readonly',
    Fancybox: 'readonly',
  },
  overrides: [
    {
      files: ['gulpfile.js', 'gulp/**/*.js'],
      env: { node: true, browser: false },
      parserOptions: { sourceType: 'script' },
    },
    {
      files: ['src/js/**/*.js'],
      env: { browser: true, node: false },
      parserOptions: { sourceType: 'script' },
    },
  ],
};
