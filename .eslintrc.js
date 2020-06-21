module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
    rules: {
        indent: [
            'error',
            4,
            { SwitchCase: 1 },
        ],
        semi: 'error',
        eqeqeq: [
            'error',
            'always',
        ],
        quotes: [
            'error',
            'single',
        ],
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
    },
};
