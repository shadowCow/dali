const path = require('path');

const baseConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dali.js',
        library: 'dali',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.ts', '.js'],
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
    },
};

module.exports = function(env, args) {
    baseConfig.entry = './src/game/boot/canary-top-down.ts';
    if (env && env.entryPoint) {
        baseConfig.entry = './src/game/boot/' + env.entryPoint;
    }
    return baseConfig;
};