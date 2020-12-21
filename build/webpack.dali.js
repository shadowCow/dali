const path = require('path');
const { lib } = require('./webpack.shared');

module.exports = function(env) {
    let entry = 'canary';

    if (env && env.ep) {
        entry = env.ep;
    }

    const config = lib(
        'dali',
        `./src/tools/dali/boot/${entry}.ts`,
    );

    return config;
};