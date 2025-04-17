import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import importPlugin from 'eslint-plugin-import';
import { projectStructureParser, projectStructurePlugin } from 'eslint-plugin-project-structure';

import { folderStructureConfig } from './folderStructure.mjs';

export default tseslint.config(
  {
    files: ['**'],
    ignores: ['projectStructure.cache.json'],
    languageOptions: { parser: projectStructureParser },
    plugins: {
      'project-structure': projectStructurePlugin,
    },
    rules: {
      'project-structure/folder-structure': ['error', folderStructureConfig],
    },
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      importPlugin.flatConfigs?.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json', './tsconfig.base.json'],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'tp',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'tp',
          style: 'kebab-case',
        },
      ],
      'import/no-deprecated': 'warn',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: '@environments/**',
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
        },
      ],
      'import/no-unused-modules': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-duplicates': 'error',
      'semi': ['error', 'always'],
      'eol-last': ['error', 'always'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
