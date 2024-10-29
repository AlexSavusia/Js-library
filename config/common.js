const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
	context: path.resolve(__dirname, '../src'),
	entry: {
		global: './global/global.js',
		main: './pages/main/main.js',
		contacts: './pages/contacts/contacts.js',
		buttons: './pages/buttons/buttons.js',
		popups: './pages/popups/popups.js',
		cards: './pages/cards/cards.js',
		myExperiment: './pages/myExperiment/myExperiment.js',
		tabs: './pages/tabs/tabs.js',
		dropdowns: './pages/dropdowns/dropdowns.js',
		forms: './pages/forms/forms.js',
	},
	// plugins: plugins(),
	plugins: [
		new HtmlWebpackPlugin({
			template: './pages/main/main.html',
			filename: 'index.html',
			chunks: [`main`, 'global', 'vendor'],
			inject: 'body',
		}),
		new HtmlWebpackPlugin({
			template: './pages/contacts/contacts.html',
			filename: 'contacts.html',
			chunks: [`contacts`, 'global', 'vendor'],
			inject: 'body',
		}),
		new HtmlWebpackPlugin({
			template: './pages/buttons/buttons.html',
			filename: 'buttons.html',
			chunks: [`buttons`, 'global', 'vendor'],
			inject: 'body',
		}),
		new HtmlWebpackPlugin({
			template: './pages/popups/popups.html',
			filename: 'popups.html',
			chunks: [`popups`, 'global', 'vendor'],
			inject: 'body',
		}),
		new HtmlWebpackPlugin({
			template: './pages/cards/cards.html',
			filename: 'cards.html',
			chunks: [`cards`, 'global', 'vendor'],
			inject: 'body',
		}),
		new HtmlWebpackPlugin({
			template: './pages/myExperiment/myExperiment.html',
			filename: 'myExperiment.html',
			chunks: [`myExperiment`, 'global', 'vendor'],
			inject: 'body',
		}),
		new HtmlWebpackPlugin({
			template: './pages/tabs/tabs.html',
			filename: 'tabs.html',
			chunks: [`tabs`, 'global', 'vendor'],
			inject: 'body',
		}),
		new HtmlWebpackPlugin({
			template: './pages/dropdowns/dropdowns.html',
			filename: 'dropdowns.html',
			chunks: [`dropdowns`, 'global', 'vendor'],
			inject: 'body',
		}),
		new HtmlWebpackPlugin({
			template: './pages/forms/forms.html',
			filename: 'forms.html',
			chunks: [`forms`, 'global', 'vendor'],
			inject: 'body',
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist') },
				{ from: path.resolve(__dirname, '../src/assets/img'), to: path.resolve(__dirname, '../dist/assets/img') },
			],
		}),
		new SpriteLoaderPlugin({ plainSprite: true }),
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {

					test: /[\\/]node_modules[\\/]/i,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg)/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/img/[name][ext]',
				},
			},
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader',
				options: {
					extract: true,
					// output: 'assets/img'
					publicPath: 'assets/',
				},
			},
			{
				test: /\.(woff|woff2|ttf|eot)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]',
				},
			},
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
};
