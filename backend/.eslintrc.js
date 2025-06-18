module.exports = {
  // Specifies the root of the configuration. ESLint will stop looking in parent folders.
  root: true,
  // The parser that will transform TypeScript code into a format ESLint can understand.
  parser: '@typescript-eslint/parser',
  // Specifies the project's parser options.
  parserOptions: {
    // This setting is required for rules that need type information.
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2022, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  // The plugins that provide additional rules.
  plugins: ['@typescript-eslint'],
  // The set of rules that ESLint will use. It extends from recommended configurations.
  extends: [
    'eslint:recommended', // Base rules from ESLint
    'plugin:@typescript-eslint/recommended', // Recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // Stricter rules that require type information
  ],
  // Specifies the environment. This defines global variables that are available.
  env: {
    node: true, // Enables Node.js global variables and Node.js scoping.
    es2021: true, // Adds all ECMAScript 2021 globals and automatically sets sourceType to 'module'.
  },
  // Disables rules for specific files or folders.
  ignorePatterns: ['dist/', 'node_modules/', '.eslintrc.js'],
  // Custom rules configuration. Here you can override or add rules.
  rules: {
    // Example: Warn about variables that are defined but not used, except for args starting with _.
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // Example: Enforce the use of 'type' for type imports.
    '@typescript-eslint/consistent-type-imports': 'error',
    // It's good practice to explicitly define function return types.
    '@typescript-eslint/explicit-function-return-type': 'warn',
    // Disallow the use of 'any' type
    '@typescript-eslint/no-explicit-any': 'warn',
    // Disallow floating promises (promises that are not handled).
    '@typescript-eslint/no-floating-promises': 'error',
  },
};