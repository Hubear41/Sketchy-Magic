const path = require('path');

module.exports = {
    context: __dirname,
    entry: './js/entry.js',
    output: {
        path: path.join(__dirname, 'js'),
        filename: 'bundle.js'
    },
    devtool: 'source-map'
};