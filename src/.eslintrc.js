module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        'prettier'
    ],
    "rules": {
        'prettier/prettier': [
            1,
            {
              trailingComma: 'es5',
              singleQuote: true,
              semi: false,
            },
          ],
          ...require('eslint-config-prettier').rules,
          ...require('eslint-config-prettier/@typescript-eslint').rules,
    }
}
