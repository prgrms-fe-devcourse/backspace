import path from "node:path";

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import { configs, plugins } from "eslint-config-airbnb-extended";
import { rules as prettierConfigRules } from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const gitignorePath = path.resolve(".", ".gitignore");

const jsConfig = [
  // ESLint Recommended Rules
  {
    name: "js/config",
    ...js.configs.recommended,
  },
  // Stylistic Plugin
  plugins.stylistic,
  // Import X Plugin
  plugins.importX,
  // Airbnb Base Recommended Config
  ...configs.base.recommended,
];

const reactConfig = [
  // React Plugin
  plugins.react,
  // React Hooks Plugin
  plugins.reactHooks,
  // React JSX A11y Plugin
  plugins.reactA11y,
  // Airbnb React Recommended Config
  ...configs.react.recommended,
];

const typescriptConfig = [
  // TypeScript ESLint Plugin
  plugins.typescriptEslint,
  // Airbnb Base TypeScript Config
  ...configs.base.typescript,
  // Airbnb React TypeScript Config
  ...configs.react.typescript,
];

const prettierConfig = [
  // Prettier Plugin
  {
    name: "prettier/plugin/config",
    plugins: {
      prettier: prettierPlugin,
    },
  },
  // Prettier Config
  {
    name: "prettier/config",
    rules: {
      ...prettierConfigRules,
      "prettier/prettier": ["error", { usePrettierrc: true }],
    },
  },
];

export default [
  // Ignore .gitignore files/folder in eslint
  includeIgnoreFile(gitignorePath),
  // Javascript Config
  ...jsConfig,
  // React Config
  ...reactConfig,
  // TypeScript Config
  ...typescriptConfig,
  // Prettier Config
  ...pluginQuery.configs["flat/recommended"],
  ...prettierConfig,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    settings: {
      "import-x/resolver": {
        typescript: {
          project: ["./tsconfig.app.json"],
        },
        node: true,
        alias: {
          map: [["@", "./src"]],
          extensions: [".ts", ".tsx"],
        },
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["error"] }],

      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "react/function-component-definition": "off",
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],

      "react/prop-types": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",

      "no-plusplus": "off",
      "no-param-reassign": ["error", { props: false }],
      "consistent-return": "off",

      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          assert: "either",
          controlComponents: ["Input"],
          depth: 3,
        },
      ],

      "import-x/extensions": "off",
      "import-x/prefer-default-export": "off",
      "import-x/no-extraneous-dependencies": "off",
      "import-x/first": "error",
      "import-x/no-duplicates": "error",
      "import-x/newline-after-import": ["error", { count: 1 }],
      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "react-dom", group: "external", position: "before" },
            { pattern: "@/**", group: "internal", position: "before" },
          ],
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
];
