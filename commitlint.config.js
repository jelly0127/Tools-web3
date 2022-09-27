module.exports = {
  extends: ['ali'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'test', 'refactor', 'chore', 'revert', 'type'],
    ],
  },
}
