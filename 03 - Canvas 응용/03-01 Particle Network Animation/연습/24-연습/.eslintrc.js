module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "prettier",
  ],
  "rules": {
    "no-var": "error",
    "prefer-const": "error",

    "prettier/prettier": [
      "error",
      {
        "singleQuote": false,
        "semi": true,
        "useTabs": false,
        "tabWidth": 2,
        "trailingComma": "all",
        "printWidth": 80,
        "bracketSpacing": true,
        "arrowParens": "avoid"
      },
    ],
  },
  "ignorePatterns": [
    ".eslintrc.js",
    "node_modules",
    "dist",
    "webpack.config.js",
  ]
}
