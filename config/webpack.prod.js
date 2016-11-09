const path                = require('path')
const webpack             = require('webpack')
const HtmlWebpackPlugin   = require('html-webpack-plugin')
const pkg                 = require('../package.json')

const __OUTPUT__          = path.join(__dirname, '..', 'dist')
const __INPUT__           = path.join(__dirname, '..', 'src')

module.exports = {

  devtool: 'source-map',

  debug: false,

  context: __dirname,

  entry: {
    index: [
      path.join(__INPUT__, 'index.js'),
    ]
  },

  output: {
    path: __OUTPUT__,
    publicPath: './',
    filename: `app.min.js`
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|r4p)/,
      loader: 'babel',
      query: {
        plugins: ['lodash', 'transform-decorators-legacy'],
        presets: ['react', 'es2015', 'stage-0']
      }
    }, {
      test: /\.s(c|a)ss$/,
      // adding source maps breaks relative paths, see https://github.com/webpack/css-loader/issues/232
      loader: 'style!css!sass'
    }, {
      test: /\.woff(\?.*)?$/,
      loader: 'url-loader?prefix=src/assets/fonts/&name=assets/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.woff2(\?.*)?$/,
      loader: 'url-loader?prefix=src/assets/fonts/&name=assets/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
    }, {
      test: /\.ttf(\?.*)?$/,
      loader: 'url-loader?prefix=src/assets/fonts/&name=assets/fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?.*)?$/,
      loader: 'file-loader?prefix=src/assets/fonts/&name=assets/fonts/[name].[ext]'
    }, {
      test: /\.svg(\?.*)?$/,
      loader: 'url-loader?prefix=src/assets/fonts/&name=assets/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.(jpg|png)$/,
      loader: 'url-loader?name=assets/images/[name].[ext]&limit=15000'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.shtml$/,
      loader: 'url-loader?name=[name].html&limit=1'
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      title: 'DESperados Crunch'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false, //prod
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      }, //prod
      compress: {
        screw_ie8: true
      }, //prod
      comments: false //prod
    })
  ],

  resolve: {
    alias: {
      assets: path.join(__INPUT__, 'assets'),
      utils: path.join(__INPUT__, 'utils'),
      routes: path.join(__INPUT__, 'routes'),
      components: path.join(__INPUT__, 'components'),
      stores: path.join(__INPUT__, 'stores')
    },
    extensions: ['', '.js', '.jsx', '.scss']
  }
}
