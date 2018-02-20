const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, "app"),
    dist: path.join(__dirname, "dist")
};

const extractSASS = new ExtractTextPlugin({
    filename: 'styles/main.css',
    allChunks: true
});

const htmlWebPack = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'app/template.html'
});

const uglifyJs = new webpack.optimize.UglifyJsPlugin({minimize: true});

module.exports = {
    context: __dirname,
    entry: [
        path.join(PATHS.app, 'scss/main.scss'),
        path.join(PATHS.app, 'index.js')
    ],
    output: {
        path: PATHS.dist,
        filename: 'index.js'
    },
    devServer: {
        inline: true
    },
    watch: false,
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: extractSASS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {url: false, minimize: true, sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: true, minimize: true}
                        }
                    ]
                })
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: true,
                        collapseWhitespace: true
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        extractSASS,
        htmlWebPack,
        uglifyJs
    ]
};
