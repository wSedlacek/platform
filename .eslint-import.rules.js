module.exports.rules = {
  'import/order': [
    'error',
    {
      pathGroups: [{ pattern: '@ng-easy/**', group: 'internal', position: 'before' }],
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
      pathGroupsExcludedImportTypes: [],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    },
  ],
  'unused-imports/no-unused-imports': 'error',
};

module.exports.plugins = ['plugin:import/errors', 'plugin:import/warnings'];

module.exports.settings = {
  'import/resolver': {
    node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
  },
};
