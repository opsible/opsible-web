const webpack = require('webpack');
const process = require('process');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/index.js',
  },
  resolve: {
    extensions: ['.js', '.scss'],
  },
  // devtool: '#inline-source-map',
  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/ },
      { test: /\.css$/,
        loader: 'style-loader!css-loader' },
      { test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.json$/,
        loader: 'json-loader' },
      { test: /\.png$/,
        loader: 'url-loader?limit=100000&publicPath=assets/&outputPath=dist/assets/' },
      { test: /\.jpg$/,
        loader: 'url-loader?limit=100000&publicPath=assets/&outputPath=dist/assets/' },
      { test: /\.(woff|woff2)?$/,
        loader: 'url-loader?limit=10000&publicPath=assets/&outputPath=dist/assets/&mimetype=application/font-woff' },
      { test: /\.ttf?$/,
        loader: 'url-loader?limit=10000&publicPath=assets/&outputPath=dist/assets/&mimetype=application/font-ttf' },
      { test: /\.eot?$/,
        loader: 'url-loader?limit=10000&publicPath=assets/&outputPath=dist/assets/&mimetype=application/vnd.ms-fontobject' },
      { test: /\.svg?$/,
        loader: 'url-loader?limit=10000&publicPath=assets/&outputPath=dist/assets/&mimetype=image/svg+xml' },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './static'),
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'static', to: 'dist' }]),
  ].concat(
    process.env.NODE_ENV === 'development'
    ? []
    : [
      new webpack.optimize.UglifyJsPlugin({
        test: /.js$/,
        minimize: true,
        comments: false,
      }),
    ]),
};

