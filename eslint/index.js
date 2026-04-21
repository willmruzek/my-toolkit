import js from '@eslint/js';
import { importSortConfig } from './import-sort.js';
import tseslint from 'typescript-eslint';

const typedLintingConfig = {
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
};

const disableTypeCheckedForJs = {
  files: ['**/*.{js,mjs,cjs,jsx}'],
  extends: [tseslint.configs.disableTypeChecked],
};

export const recommended = tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  typedLintingConfig,
  disableTypeCheckedForJs,
  importSortConfig,
);

export const strict = tseslint.config(
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  typedLintingConfig,
  disableTypeCheckedForJs,
  importSortConfig,
);
