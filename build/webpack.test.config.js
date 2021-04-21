const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack');

process.env.CURRENT_ENV = 'test';
let webpackUatConfig = merge(webpackBaseConfig, {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
							modifyVars: { "@primary-color": "#0073c9" },
						}
					}
				]
			},
		]
	},
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			commons: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: "vendors",
	// 				chunks: "all"
	// 			},
	// 		}
	// 	}
	// },
	
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.env.CURRENT_ENV': JSON.stringify('test')
		}),
		//提取css至独立文件
		new ExtractTextWebpackPlugin({
			filename: '[name].[chunkhash:8].css',
			allChunks: true,
		}),
		//压缩css
		new OptimizeCssAssetsPlugin()
	]
});

module.exports = webpackUatConfig;
