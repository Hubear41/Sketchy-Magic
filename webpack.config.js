const path = require('path');

module.exports = {
    context: __dirname,
    entry: './js/entry.js',
    output: {
        path: path.join(__dirname, 'js'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: ["@babel/env", "@babel/react"]
                    }
                }
            }
        ]
    }
};