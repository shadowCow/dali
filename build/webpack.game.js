const path = require('path');
const { lib } = require('./webpack.shared');

module.exports = function(env, args) {
    const entry = './src/game/boot/canary-top-down.ts';
    if (env && env.entryPoint) {
        entry = './src/game/boot/' + env.entryPoint;
    }

    const config = lib(
        'game',
        entry,
    );
    return config;
};