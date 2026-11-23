// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['node_modules', '.verify*', 'dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Must be last: turns off ESLint rules that fight with Prettier.
  prettier,
);
