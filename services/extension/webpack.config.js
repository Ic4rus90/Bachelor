const path = require('path');

module.exports = {
    target: 'node', // Important: This specifies that the target is Node.js
    entry: './src/extension.ts', // The entry point of your extension
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'extension.js', // The bundled output file
        libraryTarget: 'commonjs2',
    },
    
    externals: {
        vscode: 'commonjs vscode', // Specifies 'vscode' module is external
    },
    resolve: {
        extensions: ['.ts', '.js'], // Resolve these file extensions
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
    devtool: 'source-map'
};
