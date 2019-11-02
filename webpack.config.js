const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// build in node function
console.log(__dirname);

module.exports = () => {
    const CSSExtract = new MiniCssExtractPlugin({
        filename: 'styles.css',
        chunkFilename: 'styles.css',
    });
    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'

                ]
            }]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                API_URL: JSON.stringify('http://localhost:8000/'),
            }),
        ],
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
        },
        mode: 'development'

    };
};
