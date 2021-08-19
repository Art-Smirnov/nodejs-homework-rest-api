module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: ["off", "always"],
    quotes: ["off", "double"],
    "comma-dangle": "off",
    "space-before-function-paren": "off",
  },
};
// module.exports = {
//   env: {
//     commonjs: true,
//     es2021: true,
//     node: true,
//   },
//   extends: ["standard", "extends", ["plugin:json/recommended"], "prettier"],
//   parserOptions: {
//     ecmaVersion: 12,
//   },
//   rules: {},
// };
