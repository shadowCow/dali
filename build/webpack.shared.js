const path = require('path');

function lib(
    name,
    entry,
) {
    const config = baseConfig(name);

    config.context = path.resolve(__dirname, '..');
    config.entry = entry;

    return config;
}

function baseConfig(
    name,
) {
    return {
        output: {
            path: path.resolve(__dirname, '../', 'dist'),
            filename: `${name}.js`,
            library: name,
            libraryTarget: 'umd',
            globalObject: 'this',
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: [
                        path.resolve(__dirname, '..', 'src'),
                    ],
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, '..', 'tsconfig.json'),
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, '..', 'public'),
        },
    };
}
    
module.exports = {
    lib,
};