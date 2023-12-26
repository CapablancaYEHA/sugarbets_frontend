module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["react-hooks", "@typescript-eslint"],
  extends: ["eslint:recommended", "react-app", "preact"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "max-lines": 0,
    // OFF
    "no-throw-literal": "off",
    "react/jsx-props-no-spreading": "off",
    "newline-before-return": "off",
    "import/order": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "one-var": "off",
    "prefer-arrow-callback": "off",
    "no-magic-numbers": "off",
    "no-shadow": "off",
    "jest/no-deprecated-functions": "off",
    // WARN RULES
    "no-unused-vars": "warn",
    "react-hooks/exhaustive-deps": "warn",
    // ERROR RULES
    "@typescript-eslint/no-shadow": "error",
    "react-hooks/rules-of-hooks": "error",
    "no-var": "error",
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["draftState"] },
    ],
  },
};
