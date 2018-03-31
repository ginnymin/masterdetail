const path = require('path');

const ExtractTextPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    watch: true,
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build'
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: { minimize: true }
            }]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.scss$/,
            use: [
                ExtractTextPlugin.loader, 'css-loader', 'sass-loader']
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/main.html',
            filename: 'index.html'
        }),
        new ExtractTextPlugin({
            filename: 'bundle.css'
        })
    ]
};
