const { merge } = require('webpack-merge')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const prod = require('./build')

module.exports = merge(prod, {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
})