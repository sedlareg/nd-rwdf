const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Create multiple instances
const extractCSS = new ExtractTextPlugin(
    {
        filename: 'dist/[name].bundle.css',
        allChunks: true,
    }
);
const extractSASS = new ExtractTextPlugin(
    {
        filename: 'dist/styles/main.css',
        allChunks: true,
    }
);

module.exports = {
    entry:  ['./src/scss/main.scss'],
    output: {
         filename: 'dist/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: extractSASS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        extractCSS,
        extractSASS,
        new CopyWebpackPlugin([
            { from: 'src/images', to: 'dist/images' },
            { from: 'src/index.html', to: 'dist/index.html' }
        ], {debug: true})
    ],
};
