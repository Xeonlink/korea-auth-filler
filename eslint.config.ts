import { globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config([
  globalIgnores([
    "**/node_modules/**",
    ".wxt/**",
    ".output/**",
    // "wxt.config.ts"
  ]),
  eslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  react.configs.flat.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      "no-empty-pattern": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]);
