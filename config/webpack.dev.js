const path            = require('path')
const webpack         = require('webpack')
const pkg             = require('../package.json')

const __INPUT__       = path.join(__dirname, '..', 'src')

module.exports = {

  devtool: 'eval-source-map',

  context: path.join(__dirname),

  contentBase: path.join(__dirname),

  entry: {
    app: [path.join(__INPUT__, 'index.js')],
    vendor: [
      'classnames',
      'faker',
      'lodash',
      'react',
      'react-dom',
      'react-router',
      'superagent'
    ]
  },

  output: {
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        plugins: [
          'lodash',
          'transform-runtime',
          'transform-decorators-legacy'
        ],
        presets: ['react-hmre', 'react', 'es2015', 'stage-0']
      }
    }, {
      test: /\.s(c|a)ss$/,
      // adding source maps breaks relative paths, see https://github.com/webpack/css-loader/issues/232
      loader: 'style!css!sass'
    }, {
      test: /\.woff(\?.*)?$/,
      loader: 'url?prefix=/fonts&name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.woff2(\?.*)?$/,
      loader: 'url?prefix=/fonts&name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
    }, {
      test: /\.eot(\?.*)?$/,
      loader: 'url?prefix=/fonts&name=fonts/[name].[ext]'
    }, {
      test: /\.svg(\?.*)?$/,
      loader: 'url?prefix=/fonts&name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.(jpg|png)$/,
      loader: 'url?limit=25000'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },

  devServer: {
    contentBase: __INPUT__,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    quiet: false,
    proxy: {
      '/v1': {
        target: 'http://foo',
        secure: false,
        changeOrigin: true,
        ssl: {
          requestCert: false,
          rejectUnauthorized: false
        }
      }
    },
    staticOptions: {},
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
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
