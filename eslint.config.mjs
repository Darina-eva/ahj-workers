import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*", "coverage/*", "backend/*"],
  },
  {
    files: ["**/*.test.js"],
    ...jest.configs["flat/recommended"],
  },
];
