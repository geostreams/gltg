const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const commonConfig = require('./webpack.common');

module.exports = webpackMerge.merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',

    devServer: {
        hot: true,
        host: 'localhost',
        port: 8080,
        inline: true,
        watchContentBase: true,
        stats: { 'errors-only': true, 'colors': true },
        historyApiFallback: true,
        allowedHosts: JSON.parse(process.env.ALLOWED_HOSTS || '["localhost"]'),
        headers: { 'Access-Control-Allow-Origin': '*' }
    },

    plugins: [
        new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerPort: 5050 }),
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            'process.env.GEOSERVER_URL': JSON.stringify(process.env.GEOSERVER_URL || 'https://gltg-geoserver.ncsa.illinois.edu/geoserver'),
            'process.env.GEOSTREAMS_URL': JSON.stringify(process.env.GEOSTREAMS_URL || 'https://gltg-apps-dev.ncsa.illinois.edu/geostreams'),
            'process.env.BMP_API_URL': JSON.stringify(process.env.BMP_API_URL || 'https://gltg-apps-dev.ncsa.illinois.edu/bmp-api')
        })
    ]
});
