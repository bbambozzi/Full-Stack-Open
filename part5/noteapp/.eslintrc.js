module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['react', 'prettier'],
  rules: {},
};

/* {
    "printWidth": 100,
    "semi": false,
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "es5"
}
*/
