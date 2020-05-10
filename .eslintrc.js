module.exports = {
    env: {
        browser: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        indent: [
            'error',
            4
        ],
        semi: 'error',
        eqeqeq: [
            'error',
            'always'
        ],
        quotes: [
            'error',
            'single'
        ],
        'comma-dangle': [
            'error',
            'always-multiline'
        ]
    }
}