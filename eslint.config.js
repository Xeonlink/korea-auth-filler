import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  eslint.configs.recommended,
  {
    ...react.configs.flat.recommended,
    rules: {
      ...react.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  jsxA11y.flatConfigs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ...tseslint.configs.disableTypeChecked,
    files: ["**/*.js"],
  },
  {
    ignores: ["**/node_modules/**", "**/.wxt/**", "**/.output/**", "wxt.config.ts"],
  },
];
