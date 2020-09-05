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
    if (env && env.entryPoint) {
        if (env.entryPoint === 'ken') {
            baseConfig.entry = './src/boot/ken/boot.ken.ts';
        } else if (env.entryPoint === 'pop') {
            baseConfig.entry = './src/boot/pop/boot.pop.ts';
        } else {
            baseConfig.entry = './src/boot/dan/canary.ts';
        }
    }
    return baseConfig;
};