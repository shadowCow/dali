const path = require('path');

const baseConfig = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dali.js',
        library: 'dali',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
}

module.exports = function(env, args) {
    return baseConfig;
}