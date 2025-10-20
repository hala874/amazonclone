module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    "eslint:recommended"
  ],
  rules: {
    "no-unused-vars": "off",
    "no-console": "off"
  },
  globals: {
    require: "readonly",
    exports: "readonly", 
    module: "readonly",
    process: "readonly",
    __dirname: "readonly"
  }
};