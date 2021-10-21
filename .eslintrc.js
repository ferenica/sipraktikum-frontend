module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
  },
};
