const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/js/entry.js',
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'bundle.js'
    }
    // devtool: 'source-map'
};