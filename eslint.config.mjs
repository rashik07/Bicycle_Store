import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    ignores: ['node_modules', 'dist'],
    rules: {
      'no-unused-vars': 'error',
      'no-used-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'waring',
      'no-undef': 'error',
    },
    // "globals":{
    //   "process":"readonly"
    // }
  },
  ...tseslint.configs.recommended,
];
