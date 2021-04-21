const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const resolve = dir => path.resolve(process.cwd(), dir);
const PATH_NODE_MODULES = resolve('node_modules');
const cwd = process.cwd();

const chunkhash = process.env.CURRENT_ENV === 'development' ? 'hash' : 'chunkhash';
module.exports = {
    mode: process.env.CURRENT_ENV === 'development' ? 'development' : 'production',
    entry: {
        app: process.env.CURRENT_ENV === 'development' ? ['babel-polyfill', 'webpack-hot-middleware/client?noInfo=true&reload=true', './src/index.js'] : ['babel-polyfill', './src/index.js'],
    },
    output: {
        path: resolve('public'),
        chunkFilename: `[name].min.js?[hash:8]`,
        publicPath: "/",
        filename: process.env.CURRENT_ENV === 'development' ? 'scripts/app.js' : 'scripts/[name].[hash].js',
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            "@": path.resolve(__dirname, "../src")
        }
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     enforce: 'pre',
            //     use: [{
            //         loader: 'eslint-loader'
            //     }],
            //     exclude: [PATH_NODE_MODULES]
            // },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash:16].[ext]',
                    publicPath: '/',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '结算中心',
            inject: true,
            template: 'index.template.html',
        }),
        new MiniCssExtractPlugin({
            filename: `[name].min.css?[hash:8]`,
            chunkFilename: `[name].min.css?[hash:8]`,
        }),
        new webpack.ProvidePlugin({
            fetch: 'exports-loader?self.fetch!whatwg-fetch',
        }),
		new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: process.env.CURRENT_ENV === 'development' ? 'cheap-module-source-map' : 'source-map',
    performance: {
        hints: false,
    },
};
