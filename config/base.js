const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const extractSASS = new ExtractTextPlugin('[name].css');

module.exports = function() {
    return {
        entry: {
            'app': path.resolve(__dirname, '../src', 'app.js'),
            'styles': path.resolve(__dirname, '../assets/sass/styles.sass'),
            vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'bootstrap']
        },
        resolve: {
            modules: [path.resolve(__dirname, '../src'), "node_modules"],
            extensions: ['.js', '.vue'],
            alias: {
                'source': path.resolve(__dirname, '../src'),
                'components': path.resolve(__dirname, '../src/components'),
                vue: 'vue/dist/vue.js'
            }
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png$|\.jpg$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.sass$/i,
                    use: extractSASS.extract(['css-loader', 'sass-loader'])
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            extractSASS,
            new EncodingPlugin({
                encoding: 'utf-8'
            }),
            new HtmlWebpackPlugin({
                template: 'src/app.html',
                filename: 'index.html'
            }),
            new CleanWebpackPlugin(['dist'], {
                verbose: true,
                dry: false
            }),
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery',
                'window.jQuery': 'jquery'
            }),
        ]
    };
}
