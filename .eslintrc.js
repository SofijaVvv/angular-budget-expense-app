const globals = require("globals");

module.exports = {
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: [".eslintrc.js"],
  globals: {
    ngDevMode: "readonly",
    ...globals.browser,
    ...globals.jasmine,
  },
  plugins: ["@typescript-eslint", "prettier", "html", "tailwindcss", "@ngrx"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:@ngrx/all",
  ],
  rules: {
    "@typescript-eslint/no-require-imports": "off",
    "prettier/prettier": "error",
    "@ngrx/good-action-hygiene": "error",
  },
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts,html}"],
    },
  ],
};
