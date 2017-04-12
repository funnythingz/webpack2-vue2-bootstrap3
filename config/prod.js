const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./base.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(env) {
    return merge(baseConfig(), {
        output: {
            filename: '[name].prod.js'
        },
        plugins: [
            new UglifyJSPlugin({
                compress: true
            })
        ]
    })
}
