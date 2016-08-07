const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const parseArgs = require('minimist');
const pkg = require('./package.json');

const argv = parseArgs(process.argv.slice(2));

const DEBUG = !argv.release;
const VERBOSE = !!argv.verbose;
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __VERSION__: JSON.stringify(pkg.version.split('.')[0]),
};

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index'],
  },
  output: {
    filename: '[name].js?[chunkhash]',
    // filename: DEBUG ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
    chunkFilename: DEBUG ? '[name].[id].js?[chunkhash]' : '[name].[id].[chunkhash].js',
    path: path.resolve(__dirname, './build'),
    publicPath: '/build/',
  },
  resolveLoader: {
    alias: {
      'array-loader': path.resolve(__dirname, './loaders/array-loader'),
    },
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: DEBUG,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            'es2015',
            'react',
          ],
        },
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({}, GLOBALS, { 'process.env.BROWSER': true })),
  ],
  postcss() {
    return {
      defaults: [autoprefixer],
    };
  },
  cache: DEBUG,
  debug: DEBUG,
  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
};
