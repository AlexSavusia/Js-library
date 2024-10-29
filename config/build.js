const path = require('path');
const { merge } = require('webpack-merge')
const common = require('./common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Служит для попадания стилей в нужную папку билда
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'); // Служит для минификации css из модулей
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }
})