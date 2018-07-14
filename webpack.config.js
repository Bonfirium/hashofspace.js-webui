const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
	template: `${__dirname}/src/assets/index.html`,
	filename: 'index.html',
	inject: 'body',
});

const { version } = require('./package.json');

module.exports = {
	entry: {
		app: path.resolve('src/app.js'),
	},
	output: {
		publicPath: '/',
		path: path.resolve('dist'),
		filename: `[name].${version}.js`,
		// pathinfo: process.env.NODE_ENV === 'local',
		pathinfo: true,
		sourceMapFilename: '[name].js.map',
		chunkFilename: '[name].bundle.js',
	},
	// devtool: process.env.NODE_ENV !== 'local' ? 'cheap-module-source-map' : 'eval',
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.png$/,
				loader: 'url-loader?limit=100000',
			},
		],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
	resolve: {
		modules: [
			path.resolve('src'),
			'node_modules',
		],
		extensions: ['.js', '.jsx', '.json'],
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		HTMLWebpackPluginConfig,
	],
};
