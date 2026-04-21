import perfectionist from 'eslint-plugin-perfectionist';

export const importSortConfig = {
  plugins: {
    perfectionist,
  },
  rules: {
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        fallbackSort: {
          type: 'unsorted',
        },
        ignoreCase: true,
        specialCharacters: 'keep',
        partitionByComment: false,
        partitionByNewLine: false,
        newlinesBetween: 1,
        groups: [
          'side-effects',
          'node-protocol',
          'react',
          'external',
          'src-alias',
          'subpath',
          'parent-3-plus',
          'parent-2',
          'parent-1',
          ['sibling', 'index'],
          'style',
          'unknown',
        ],
        customGroups: [
          {
            groupName: 'side-effects',
            selector: 'side-effect',
          },
          {
            groupName: 'node-protocol',
            elementNamePattern: '^node:',
          },
          {
            groupName: 'react',
            elementNamePattern: '^react$|^react-dom$',
          },
          {
            groupName: 'src-alias',
            elementNamePattern: '^@/',
          },
          {
            groupName: 'subpath',
            elementNamePattern: '^#',
          },
          {
            groupName: 'parent-3-plus',
            elementNamePattern: '^\.\.\/\.\.\/\.\.\/',
          },
          {
            groupName: 'parent-2',
            elementNamePattern: '^\.\.\/\.\.\/',
          },
          {
            groupName: 'parent-1',
            elementNamePattern: '^\.\.\/',
          },
          {
            groupName: 'style',
            selector: 'side-effect-style',
          },
          {
            groupName: 'style',
            selector: 'style',
          },
        ],
        environment: 'node',
      },
    ],
  },
};
