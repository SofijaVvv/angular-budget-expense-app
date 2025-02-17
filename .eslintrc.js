const globals = require("globals");

module.exports = {
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  globals: {
    ngDevMode: "readonly",
    ...globals.browser,
    ...globals.jasmine,
  },
  plugins: ["@typescript-eslint", "prettier", "html", "tailwindcss"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
  ],
  rules: {
    "@typescript-eslint/no-require-imports": "off",
    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts,html}"],
    },
  ],
};
