var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: {
        'styles': path.resolve(__dirname, 'src/styles.ts'),
        'bundle': path.resolve(__dirname, 'src/index.tsx')
    },
    output: {
        library: '[name]',
        libraryTarget: 'var',
        filename: './public/bundle/[name].js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        new ExtractTextPlugin("./public/bundle/[name].css")
    ],
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            include: [/src/, /docs/]
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    'less-loader'
                ]
            })
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".ts", ".tsx"]
    },
    node: {
        fs: "empty"
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        compress: true,
        port: 9000
    }
};
