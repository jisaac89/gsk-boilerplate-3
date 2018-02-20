var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const extractStyles = (loaders) => {
  if (process.env.NODE_ENV === 'production') {
    return ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: loaders,
    });
  }
  return ['style-loader', ...loaders];
};


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
    new ExtractTextPlugin("./public/bundle/[name].css")
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot'],
      include: path.join(__dirname, 'public')
    }, {
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
  target: 'node',
  externals: nodeModules
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'public'),
  //   compress: true,
  //   port: 9000,
  //   historyApiFallback: true
  // }
};