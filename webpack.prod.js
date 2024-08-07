const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonConfig = require('./webpack.common');


module.exports = webpackMerge.merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',

    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './config.json',
                    to: 'config.json'
                }
            ]
        }),
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            'process.env.GEOSERVER_URL': JSON.stringify(process.env.GEOSERVER_URL || '/geoserver'),
            'process.env.GEOSTREAMS_URL': JSON.stringify(process.env.GEOSTREAMS_URL || '/geostreams'),
            'process.env.BMP_API_URL': JSON.stringify(process.env.BMP_API_URL || '/bmp-api/v1.0')
        })
    ]
});
