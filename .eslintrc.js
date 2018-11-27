module.exports = {
  "plugins": [
      "react"
  ],
  "rules": {
    'no-console': 'off',
    'func-names': ["error", "never"]
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6":     true,
    "browser": true,
    "node":    true,
    "mocha":   true
  },
  extends: ['airbnb', 'plugin:react/recommended']
};
