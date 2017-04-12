var merge = require('webpack-merge');
var path = require('path');
var baseConfig = require('./base.js');

module.exports = function(env) {
    return merge(baseConfig(), {
        devtool: 'source-map',
        output: {
            filename: '[name].dev.js',
            sourceMapFilename: '[name].map'
        },
        devServer: {
            contentBase: path.resolve(__dirname, "../dist"),
            compress: true,
            port: 8080
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        }
    });
}
