const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Служит для попадания стилей в нужную папку билда

const common = require('./common');
const { emitWarning } = require('process');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    stats: 'errors-warnings',
    devServer: {
        compress: true,
        hot: false,
        open: true,
        port: 4200,
        watchFiles: ['../src/**/*'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
});
