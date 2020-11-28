const path = require('path');
const { lib } = require('./webpack.shared');

module.exports = function(env, args) {
    const config = lib(
        'dali',
        './src/tools/dali/Dali.ts',
    );

    return config;
};