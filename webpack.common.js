const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const Webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const { dependencies } = require('./package.json');

module.exports = {
    target: 'web',

    entry: {
        index: path.resolve(__dirname, './src/index.jsx'),
        olStyle: 'ol/ol.css',
        olLayerSwitcherStyle: 'ol-layerswitcher/src/ol-layerswitcher.css',
        mcw__old: 'material-components-web/dist/material-components-web.min.css',
        mdc__old: '@geostreams/gltg__old/app/styles_custom/react-mdc-web.css',
        coreStyle: '@geostreams/core/src/styles/core.less',
        gltgStyle: './src/styles/gltg.less'
    },

    output: {
        path: path.resolve('./build'),
        publicPath: process.env.CONTEXT || '/',
        filename: 'js/[name]-[chunkhash].js',
        crossOriginLoading: 'anonymous'
    },

    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules\/(?!(@geostreams)\/).*/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                '@babel/env',
                                '@babel/flow',
                                '@babel/react'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-export-default-from',
                                '@babel/plugin-proposal-export-namespace-from'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/, // TODO add css after porting all the __old codes
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                paths: [
                                    path.resolve('./src'),
                                    path.resolve('./node_modules')
                                ]
                            },
                            sourceMap: true
                        }
                    }
                ]
            },
            // TODO remove the following two rules after porting all the __old codes
            {
                test: /\.css$/,
                include: [
                    /node_modules\/(?!(@geostreams)\/).*/,
                    /styles_custom/
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: [
                    /node_modules\/(?!(@geostreams)\/).*/,
                    /styles_custom/
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader?modules'
                ]
            },
            {
                type: 'javascript/auto',
                test: /\.geojson$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[name]-[contenthash].[ext]'
                        }
                    }
                ]
            },
            // loader for specific json files
            {
                type: 'javascript/auto',
                test: /data_20years\.json$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[name]-[contenthash].[ext]'
                        }
                    }
                ]  
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|eot|ttf|woff|woff2|pbf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[name]-[contenthash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /.html$/,
                exclude: /.*\/index.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'pages/[name]-[contenthash].html'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react': path.resolve('./node_modules/react'),
            'redux': path.resolve('./node_modules/redux'),
            'react-router-dom': path.resolve('./node_modules/react-router-dom'),
            'react-redux': path.resolve('./node_modules/react-redux'),
            '@material-ui': path.resolve('./node_modules/@material-ui'),
            'process': path.resolve('./node_modules/process')
        }
    },

    plugins: [
        new Webpack.ProvidePlugin({
            process: 'process/browser'
        }),
        new Webpack.DefinePlugin({
            'process.env.VERSION': JSON.stringify(
                dependencies['@geostreams/core']
            ),
            'process.env.CONTEXT': JSON.stringify(process.env.CONTEXT)
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html'),
            google_analytics: process.env.GA_TOKEN
        }),
        new FaviconsWebpackPlugin({
            logo: './src/images/logo_app.png',
            prefix: 'icons/',
            emitStats: false,
            inject: true
        }),
        new MiniCssExtractPlugin({ filename: 'css/[name]-[chunkhash].css' }),
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            emitWarning: true,
            failOnError: false
        })
    ]
};
